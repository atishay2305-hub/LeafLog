import { createUser } from './your-auth-file-path.mjs'; 

async function seed() {
    try {
        const user = await createUser('John', 'Doe', 'johndoe', 'john@example.com', 'password123', '1990-01-01');
        console.log('User created:', user);
    } catch (error) {
        console.error('Error creating user:', error.message);
    }
}

seed();
