import { createUser, checkUser } from '../data/users.mjs';

async function seed() {
    try {
        const user = await createUser('John', 'Doe', 'johndoe', 'john@stevens.edu', 'Password123#', '1990-01-01');
        console.log('User created:', user);
    } catch (error) {
        console.error('Error creating user:', error.message);
    }
}


// Define a test function
async function testCheckUser() {
  try {
    const user = await checkUser('johndoe@stevens.edu', 'strongPassword123#');
    console.log('User:', user);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testCheckUser();


seed();
