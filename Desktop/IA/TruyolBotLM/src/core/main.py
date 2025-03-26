from core.interaction import obtener_pregunta, mostrar_respuesta
from core.model_handler import generar_respuesta

# Bucle para interacción indefinida
while True:
    # Solicitar una pregunta al usuario
    pregunta = obtener_pregunta()
    
    # Salir del bucle si el usuario escribe 'salir'
    if pregunta.lower() == "salir":
        print("¡Hasta luego!")
        break
    
    # Generar y mostrar la respuesta
    respuesta = generar_respuesta(pregunta)
    mostrar_respuesta(respuesta)
