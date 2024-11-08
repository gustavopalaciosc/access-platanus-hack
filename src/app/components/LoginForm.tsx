import Button from "./Button";

export default function LoginForm() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg m-5">
                <form className="flex flex-col" action="">
                    <label htmlFor="username" className="mb-2 text-gray-300">Nombre de usuario</label>
                    <input 
                        className="m-[5px] w-full h-[40px] rounded-md text-white bg-gray-700 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500" 
                        type="text" 
                        id="username" 
                    />
                    <label htmlFor="password" className="mb-2 text-gray-300">Contraseña</label>
                    <input 
                        className="m-[5px] w-full h-[40px] rounded-md text-white bg-gray-700 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500" 
                        type="password" 
                        id="password" 
                    />
                    <div className="mt-6 flex justify-center">
                        <Button label="Iniciar sesión" />
                    </div>
                </form>
            </div>
        </div>
    );
}


