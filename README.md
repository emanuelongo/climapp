


CLIMAPP




Modelo de Análisis del Sistema



Equipo de Trabajo



Responsables
Valentina Carmona Guzmán
Emanuel Gallego Cano
Dillan Arley Urrego Ceballos
Juan Manuel Yepes Montoya



CLIMAPP

Modelo de análisis


1.        Descripción del proyecto
Introducción (Justificación)
El presente documento define el propósito y alcance para el desarrollo de una aplicación web de consulta meteorológica. El objetivo es ofrecer a los usuarios una forma rápida, sencilla e intuitiva de acceder a la información del clima actual y al pronóstico de los próximos días. Este proyecto surge de la necesidad de contar con una herramienta simple y directa, en contraste con muchas aplicaciones existentes que están sobrecargadas de funciones complejas. La aplicación está dirigida a cualquier persona que necesite planificar sus actividades diarias (trabajo, estudio, ocio) basándose en las condiciones climáticas, resolviendo el problema de la pérdida de tiempo y la confusión al usar plataformas poco amigables.

Usuarios identificados:
Cualquier persona que quiera saber el clima de su ciudad o de otra localidad de interés.
Estado actual de los procesos que se desean intervenir.
Consulta y acceso manual de información meteorológica en múltiples plataformas:
Actualmente los usuarios deben de acceder a diversas plataformas para consultar información meteorológica, por otro lado muchas aplicaciones requieren múltiples pasos (selección de ubicación manual, permisos) muchas de estas también tienen interfaces poco intuitivas con los usuarios o están cargadas de publicidad, esto puede generar confusión para algunas personas que solo buscan información básica como por ejemplo humedad, pronostico diario o temperatura.

Dependencia de medios tradicionales:
Muchas personas dependen de los medios tradicionales como tv (noticias), radio, etc; haciendo que el acceso a la información no sea actualizada en tiempo real y reduzca la capacidad de una información específica. 
 

Actualización de datos en tiempo real:
Tener que actualizar aplicaciones manualmente para que se refresquen y los datos se muestran actualizados.

Falta de personalización y ubicación automática en plataformas existentes:
Muchas aplicaciones requieren que el usuario busque manualmente su ciudad cada vez que desea consultar el clima, sin aprovechar funciones como la detección automática de ubicación.

Accesibilidad y Usabilidad:
Interfaces poco claras para adultos mayores o personas con menos experiencia tecnológica.

Impacto que se busca lograr:
Ahorro de tiempo y mejora en la toma de decisiones diarias:
Al ofrecer una herramienta directa y eficiente, los usuarios podrán consultar rápidamente el estado del clima sin distracciones ni procesos complicados, lo que facilitará la planificación de sus actividades diarias como trabajo, estudio o salidas recreativas.

Mayor accesibilidad a información confiable y actualizada:
La plataforma permitirá el acceso a datos meteorológicos en tiempo real y pronósticos actualizados, desde cualquier dispositivo con conexión a internet, promoviendo una cultura de consulta informada.

Reducción de la frustración generada por interfaces complejas:
Al priorizar la usabilidad y simplicidad, se busca evitar la experiencia negativa que producen muchas aplicaciones sobrecargadas de funciones irrelevantes para el usuario promedio.

Mejora en la Experiencia del Usuario (UX):
Reducción del tiempo y esfuerzo para acceder a información climática relevante.


Bajo Costo de Implementación y Mantenimiento:
Al ser una aplicación web (no nativa), se reduce el costo de desarrollo y actualizaciones.

Alcance esperado:
Consulta del clima actual por ciudad escrita manualmente o a través de detección automática de ubicación (geolocalización).
Interfaz web simple, intuitiva y responsiva, accesible desde dispositivos móviles, tablets o computadoras.
Barra de búsqueda por nombre de ciudad que facilite la interacción del usuario.
Funcionalidad de autocompletado que muestre sugerencias de ciudades válidas mientras el usuario escribe.
Consejos personalizados según el clima actual, para ayudar al usuario en la toma de decisiones diarias.


Requisitos:

Funcionales.
Módulo 1: Gestión de Ubicación

RF-01: El sistema debe permitir al usuario buscar una ciudad por su nombre.

RF-02: El sistema debe mostrar una lista de sugerencias mientras el usuario escribe en la barra de búsqueda.

RF-03: El sistema debe poder solicitar permiso para acceder a la geolocalización del navegador y establecer la ubicación actual del usuario.

Módulo 2: Visualización del Clima

RF-04: El sistema debe mostrar la temperatura actual de la ciudad seleccionada.

RF-05: El sistema debe mostrar el estado actual del clima (soleado, nublado, lluvia, etc.).

RF-06: El sistema debe mostrar detalles adicionales como la humedad, la velocidad del viento y la sensación térmica. (opcional)

RF-07: El sistema debe presentar el pronóstico del tiempo para los próximos 5 días, incluyendo temperatura máxima, mínima.

No funcionales.
1. Usabilidad
NF-01: La interfaz debe ser intuitiva y accesible para usuarios con poca experiencia tecnológica (ej.: adultos mayores).

NF-02: Tiempo máximo de aprendizaje: Un usuario nuevo debe poder realizar una búsqueda básica en menos de 15 minutos sin instrucciones previas.

NF-03: Diseño responsivo que funcione correctamente en dispositivos móviles, tablets y de escritorio.

2. Rendimiento
NF-04: Tiempo de carga inicial de la aplicación: ≤ 2 segundos en conexiones 4G/LTE.

NF-05: Tiempo de respuesta al buscar una ciudad: ≤ 1.5 segundos (incluyendo la consulta a la API externa).

NF-06: La aplicación debe manejar hasta 150 solicitudes concurrentes sin degradación significativa del rendimiento.

3. Disponibilidad
NF-07: La aplicación debe estar disponible al menos el 99% del tiempo (excluyendo mantenimiento programado).

NF-08: En caso de caída de la API meteorológica, la aplicación debe mostrar un mensaje de error claro sin bloquear la interfaz (degradación elegante).

4. Seguridad
NF-09: Todos los datos transmitidos entre el cliente y el servidor deben usar HTTPS (SSL/TLS).

NF-10: No se almacenarán datos sensibles del usuario (como ubicación GPS) en bases de datos o logs.

NF-11: La aplicación debe cumplir con GDPR y otras regulaciones de privacidad aplicables (solo almacenar datos necesarios en localStorage).

5. Compatibilidad
NF-12: Soporte para las últimas 2 versiones de navegadores: Chrome, Firefox, Safari y Edge.

NF-13: Funcionamiento correcto en sistemas operativos móviles (Android 10+, iOS 14+).

6. Mantenibilidad y Escalabilidad
NF-14: El código debe estar documentado y modularizado para facilitar actualizaciones futuras.

NF-15: Uso de una API externa confiable (ej.: OpenWeatherMap, WeatherAPI) con plan gratuito o de bajo costo para reducir dependencia de infraestructura propia.

7. Accesibilidad
NF-16: Cumplir con WCAG 2.1 nivel AA (contraste adecuado, soporte para lectores de pantalla, textos descriptivos en íconos).

NF-17: Opción para aumentar el tamaño de fuente sin romper el diseño.

8. Internacionalización (i18n)
9. Almacenamiento Local
NF-19: Uso de localStorage para guardar preferencias (unidad de temperatura, historial), con límite de 5MB por usuario.

10. Experiencia del Usuario (UX)
NF-20: Animaciones fluidas en transiciones (ej.: carga de datos, cambio de pantallas) con duración ≤ 300ms para no afectar la percepción de velocidad.
Reglas de negocio
Módulo 1: Gestión de Acceso
RN1 - Acceso sin autenticación
"No se debe requerir registro para acceder a las funciones básicas. Todas las funciones establecidas en el alcance (consulta por ciudad, autocompletado, consejos según clima) deben estar disponibles sin crear una cuenta o iniciar sesión."

Módulo 2: Búsqueda y Validación
RN2 - Validación de ciudades
"La aplicación solo mostrará datos de ciudades válidas (no aceptará nombres ficticios o mal escritos). El sistema debe verificar que la ubicación exista en la base de datos de la API antes de mostrar resultados."

RN3 - Filtrado de búsquedas
"La aplicación no permitirá búsquedas vacías o con caracteres inválidos (ej.: '123#@'). El campo de búsqueda debe ignorar espacios vacíos y caracteres especiales no relacionados con nombres geográficos."

RN4 - Autocompletado controlado
"El autocompletado solo debe sugerir ciudades reconocidas por la API. Las sugerencias de búsqueda deben estar basadas exclusivamente en datos provistos por la fuente oficial y no permitirá seleccionar entradas manuales inválidas."

RN5 - Permisos de geolocalización
"Si el usuario opta por la búsqueda automática por ubicación, el sistema debe solicitar y respetar explícitamente los permisos del navegador. La aplicación no procederá con la geolocalización sin autorización previa."

Módulo 3: Manejo de Errores
RN6 - Retroalimentación de búsqueda
"Si no se devuelven datos para una ciudad, se mostrará un mensaje claro: 'No encontramos esta ubicación. Verifica el nombre o intenta otra ciudad'. El mensaje debe incluir un ícono de advertencia y mostrarse durante 5 segundos."

RN7 - Fallos de API
"Si la API falla, se mostrará un mensaje genérico: 'No podemos obtener datos en este momento. Intenta más tarde'. Este mensaje aparecerá en un banner rojo en la parte superior de la interfaz."

Módulo 4: Configuración
RN8 - Unidades de medida
"La temperatura siempre se mostrará inicialmente en °C, con una opción visible en el menú de configuración para cambiar a °F. La preferencia seleccionada debe persistir entre sesiones."

Módulo 5: Almacenamiento y Privacidad
RN9 - Historial local
"El historial de búsquedas recientes almacenará máximo 5 ubicaciones. Los datos se guardarán en localStorage y se mostrarán en orden cronológico inverso (la más reciente primero)."

RN10 - Protección de ubicación
"La ubicación GPS nunca se almacenará en bases de datos ni se compartirá con terceros. Los datos de geolocalización solo se usarán para la consulta actual y se descartaron inmediatamente después."
Especificación de Requisitos

Módulo 1: Gestión de Acceso
Este módulo garantiza que el uso de la aplicación sea libre y sin necesidad de autenticación por parte del usuario.
Funcionalidades agrupadas:
Acceso directo a la aplicación sin necesidad de crear una cuenta.
Disponibilidad de todas las funciones principales (búsqueda, visualización de clima, consejos) sin inicio de sesión.
Interfaz pública, sin restricciones por rol de usuario.
 Regla asociada:
RN1 – Acceso sin autenticación

Módulo 2: Búsqueda y Validación
Se encarga del ingreso de ciudades, validación de datos y obtención de resultados desde la fuente oficial.
Funcionalidades agrupadas:
Barra de búsqueda con validación de entradas (evitar campos vacíos o caracteres inválidos).
Validación de existencia de la ciudad mediante consulta a la API meteorológica.
Autocompletado basado en resultados reales de la API.
Búsqueda automática por ubicación actual, con solicitud previa de permisos.
Evitar errores tipográficos con sugerencias correctas.
 Reglas asociadas:
RN2 – Validación de ciudades
RN3 – Filtrado de búsquedas
RN4 – Autocompletado controlado
RN5 – Permisos de geolocalización

Módulo 3: Manejo de Errores
Gestiona la retroalimentación clara al usuario en situaciones de error o fallos externos.
Funcionalidades agrupadas:
Mostrar mensajes amigables cuando no se encuentre una ciudad.
Informar fallos en la API de forma visible y clara.
Usar íconos e indicadores visuales para mejorar la comprensión del usuario.
Control del tiempo de visualización de mensajes.
Reglas asociadas:
RN6 – Retroalimentación de búsqueda
RN7 – Fallos de API

Módulo 4: Configuración
Permite al usuario personalizar aspectos básicos de la visualización de la aplicación.
Funcionalidades agrupadas:
Opción para seleccionar la unidad de temperatura (°C o °F).
Persistencia de la preferencia de unidad entre sesiones mediante almacenamiento local.
Interfaz de configuración simple y accesible.
Regla asociada:
RN8 – Unidades de medida

Módulo 5: Almacenamiento y Privacidad
Gestiona la información almacenada localmente y garantiza la protección de los datos sensibles del usuario.
Funcionalidades agrupadas:
Almacenamiento en localStorage de las últimas 5 ciudades consultadas.
Visualización del historial de búsquedas recientes en orden cronológico inverso.
Protección estricta de los datos de ubicación: no se guarda ni comparte con terceros.
Uso puntual de la ubicación solo durante la sesión activa.
Reglas asociadas:
RN9 – Historial local
RN10 – Protección de ubicación
