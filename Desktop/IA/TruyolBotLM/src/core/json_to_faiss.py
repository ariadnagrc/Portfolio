from transformers import AutoTokenizer, AutoModelForCausalLM
import json
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Cargar el modelo y tokenizer de DeepSeek R1
tokenizer = AutoTokenizer.from_pretrained("deepseek/r1")
model = AutoModelForCausalLM.from_pretrained("deepseek/r1")

# Función para cargar los datos de la FAQ (en formato JSON)
def load_faq(file_path):
    with open(file_path, 'r') as f:
        faq_data = json.load(f)
    return faq_data

# Función para generar respuestas con el modelo
def generate_response(prompt, max_length=100, temperature=0.7, top_p=0.9, top_k=50):
    inputs = tokenizer(prompt, return_tensors="pt")
    
    # Crear la máscara de atención
    attention_mask = inputs["attention_mask"]

    # Generar la respuesta
    output = model.generate(
        inputs["input_ids"],
        attention_mask=attention_mask,  # Aseguramos de pasar la máscara de atención
        max_length=max_length,
        temperature=temperature,
        top_p=top_p,
        top_k=top_k,
        do_sample=True,  # Activamos el muestreo
        num_return_sequences=1,
        pad_token_id=tokenizer.eos_token_id
    )
    
    # Decodificar la respuesta
    response = tokenizer.decode(output[0], skip_special_tokens=True)
    return response.strip()

# Función para calcular la similitud de Coseno entre preguntas
def find_answer(query, faq_data):
    faq_questions = []
    faq_responses = []

    # Crear listas de preguntas y respuestas de la FAQ
    for item in faq_data:
        for question in item['preguntas']:
            faq_questions.append(question)
            faq_responses.append(item['respuesta'])

    # Utilizamos TfidfVectorizer para representar las preguntas y calcular la similitud
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(faq_questions + [query])
    
    cosine_similarities = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])
    max_similarity_idx = np.argmax(cosine_similarities)
    
    if cosine_similarities[0][max_similarity_idx] > 0.3:  # Umbral para aceptar similitudes más altas
        return faq_responses[max_similarity_idx]
    else:
        return None  # Si no se encuentra una buena coincidencia, retornamos None

# Función principal para interactuar con el usuario
def chat_with_bot(faq_data):
    print("Hola, soy tu asistente virtual. ¡Hazme cualquier pregunta!")
    print("Escribe 'salir' para terminar la conversación.")
    
    while True:
        # Tomar pregunta del usuario
        query = input("Pregunta: ")
        
        # Verificar si el usuario quiere salir
        if query.lower() == "salir":
            print("¡Adiós! Que tengas un buen día.")
            break
        
        # Buscar respuesta en la FAQ
        response = find_answer(query, faq_data)
        
        # Si no se encuentra en la FAQ, usar el modelo para generar una respuesta
        if response is None:
            print("No encontré una respuesta exacta en la FAQ, generando respuesta con el modelo...")
            # Ajustamos el prompt para hacer que el modelo genere respuestas más relevantes
            response = generate_response(f"Pregunta: {query}\nRespuesta:")

        # Mostrar la respuesta del bot
        print(f"Bot: {response}\n")

# Cargar los datos de la FAQ
base_dir = os.path.dirname(os.path.abspath(__file__))
json_file_path = os.path.join(base_dir, '../../data/data.json')
data = load_faq(json_file_path)

# Iniciar el chat
chat_with_bot(data)
