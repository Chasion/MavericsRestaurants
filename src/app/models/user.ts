export interface User {
   uid: string;
   email: string;
   displayName: string;
   photoURL: string;
   emailVerified: boolean;
   rol: number;
   clave?: string; // Validar que no sea tema de seguridad
   state: boolean;
}