# Firebase Functions Server

Este proyecto contiene un servidor que permite gestionar usuarios de Firebase Authentication. Con este servidor, puedes modificar la información de los usuarios, eliminarlos, y realizar otras funciones relacionadas con el ecosistema de Firebase.

## Características

- **Eliminación de Usuarios**: Elimina usuarios de Firebase Authentication.
- **Gestión de Roles**: Asigna y gestiona roles de usuarios.
- **Autenticación Segura**: Implementa autenticación segura utilizando Firebase Auth.
- **Integración con Realtime Firebase**: Sincroniza datos de usuarios con Firestore para un manejo más eficiente.

## Endpoints

- **POST /setRole**: Asigna un rol y un local personalizados a un usuario.
  - **Body**: `{ uid: string, role: string, local: string }`
  - **Descripción**: Esta función permite asignar un rol y un local personalizados a un usuario específico mediante su UID.

- **POST /getClaims**: Verifica el token y obtiene los custom claims de un usuario.
  - **Body**: `{ idToken: string }`
  - **Descripción**: Verifica el token de autenticación de un usuario y devuelve los claims personalizados (rol y local) asociados a ese token.

- **POST /setSuperRole**: Asigna un rol personalizado solo al SUPERUSER.
  - **Body**: `{ uid: string, role: string }`
  - **Descripción**: Asigna un rol personalizado a un usuario específico, identificado como SUPERUSER.

- **POST /getClaimsSuper**: Verifica el token y obtiene los custom claims solo del SUPERUSER.
  - **Body**: `{ idToken: string }`
  - **Descripción**: Verifica el token de autenticación del SUPERUSER y devuelve los claims personalizados asociados a ese token.

- **DELETE /eliminarUsuario/:uid**: Elimina un usuario de Firebase Authentication.
  - **Params**: `{ uid: string }`
  - **Descripción**: Elimina un usuario de Firebase Authentication utilizando su UID.

- **GET /testConnection**: Prueba de conexión.
  - **Descripción**: Endpoint para verificar que la conexión con el servidor es exitosa.


## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añade nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.


## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme a través de [mi perfil de GitHub](https://github.com/rapo84).
