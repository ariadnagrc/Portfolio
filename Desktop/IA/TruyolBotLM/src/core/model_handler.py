from transformers import AutoModelForCausalLM, AutoTokenizer

# Cargar el modelo en CPU (sin usar GPU)
modelo = AutoModelForCausalLM.from_pretrained("deepseek-ai/deepseek-7b-chat", device_map="cpu")
tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/deepseek-7b-chat")

def generar_respuesta(pregunta):
    # Tokenizar la pregunta de entrada
    entrada = tokenizer(pregunta, return_tensors="pt").to("cpu") 
    # Generar la respuesta
    salida = modelo.generate(**entrada, max_length=200)
    # Decodificar la salida para obtener el texto en formato legible
    return tokenizer.decode(salida[0], skip_special_tokens=True)
