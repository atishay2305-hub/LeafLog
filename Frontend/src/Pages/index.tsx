import React, { useEffect } from 'react';
import styles from './index.module.css'; // Importing CSS module styles

const Home: React.FC = () => {
    useEffect(() => {
        // if (userInfo) {
        //   // Check if history object is available, otherwise fallback to default behavior
        //   if (history) {
        //     history.push("/mynotes");
        //   } else {
        //     window.location.href = "/mynotes"; // Fallback to window location
        //   }
        // }
    }, []);

    return (
        <div className={styles.main}> {/* Applying CSS module class 'main' */}
            <div className="container mx-auto">
                <div className={styles['intro-text']}> {/* Applying CSS module class 'intro-text' */}
                    <div>
                        <h1 className={styles.title}>Welcome to Leaflog</h1> {/* Applying CSS module class 'title' */}
                        <p className={styles.subtitle}>One Safe Place for all your notes.</p> {/* Applying CSS module class 'subtitle' */}
                    </div>
                    <div className="flex justify-center">
                        <a href="/login" className="mr-4">
                            <button className={`${styles.landingbutton} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline`}>
                                Login
                            </button>
                        </a>
                        <a href="/register">
                            <button className={`${styles.landingbutton} ${styles['landingbutton-outline-primary']} bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg focus:outline-none focus:shadow-outline`}> {/* Applying multiple CSS module classes */}
                                Signup
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
