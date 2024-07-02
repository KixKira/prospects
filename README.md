# Formulario de Pre-Registro SISPROT

Este proyecto es un formulario de pre-registro para posibles clientes de SISPROT, una empresa de internet de fibra óptica. El formulario permite a los usuarios registrar su interés en los servicios de SISPROT y proporciona información detallada sobre sus necesidades y ubicación.

## Características Principales

* **Diseño Responsive:** El formulario se adapta a diferentes tamaños de pantalla (escritorio, tablet, móvil) para una experiencia de usuario óptima.
* **Validación de Datos:** Se utiliza Zod para validar los datos ingresados por el usuario y asegurar la calidad de la información.
* **Integración con Supabase:** Los datos del formulario se almacenan de forma segura en una base de datos Supabase.
* **Geolocalización:** El formulario incluye un mapa interactivo para que los usuarios puedan indicar su ubicación exacta.
* **Selección de Planes:** Los usuarios pueden seleccionar el plan de internet que mejor se adapte a sus necesidades.
* **Mensajes de Confirmación:** Se envían mensajes de confirmación a los usuarios y a los vendedores a través de Ultramsg.

## Tecnologías Utilizadas

* **React:** Biblioteca de JavaScript para construir interfaces de usuario.
* **Redux Toolkit:** Biblioteca para gestionar el estado global de la aplicación.
* **Material UI:** Biblioteca de componentes de interfaz de usuario para React.
* **Supabase:** Plataforma Backend as a Service (BaaS) que proporciona una base de datos PostgreSQL y autenticación.
* **Zod:** Biblioteca de validación de datos para TypeScript y JavaScript.
* **Axios:** Biblioteca para realizar peticiones HTTP.
* **Ultramsg:** Servicio para enviar mensajes SMS y WhatsApp.
* **Google Maps JavaScript API:** API para mostrar mapas interactivos.

## Instalación y Uso

1. **Clonar el Repositorio:**
   ```
   git clone https://github.com/KixKira/prospects.git
   ```

2. **Instalar Dependencias**
   ```
   npm install
   ```

3. **Configurar Supabase:**
   * Crea un proyecto en Supabase.
   * Obtén la URL y la clave API de tu proyecto.
   * Reemplaza los valores en `supabase/config.js`.
   * Crea las tablas necesarias en tu base de datos Supabase.

4. **Obtener una API Key de Google Maps:**
   * Sigue las instrucciones en la documentación de **Google Maps** para obtener una clave API.
   * Reemplaza `TU_API_KEY` en `MapLocation.jsx` con tu clave API.

5. **Configurar Ultramsg:**
   * Crea una cuenta en **Ultramsg**.
   * Obtén tu token de instancia y ID de canal de WhatsApp.
   * Reemplaza los valores en `FormularioPreRegistro.jsx`.

6. **Iniciar la Aplicación:**
   ```
   npm start
   ```

## Estructura del Proyecto
* `components/`: Contiene los componentes individuales del formulario.
* `features/preRegistro/`: Contiene la lógica de Redux para el formulario.
* `pages/`: Contiene el componente principal del formulario.
* `supabase/`: Contiene la configuración de Supabase.

## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un PR.

## Licencia
Este proyecto está bajo la Licencia MIT.