import React from 'react'

const Login = ({ setShowLogin }) => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    console.log("Login component mounted!");
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <div 
      onClick={() => {
        console.log("Backdrop clicked, closing...");
        setShowLogin(false);
      }} 
      className='fixed top-0 bottom-0 left-0 right-0 z-[9999] flex items-center justify-center bg-black/50'
    >
      <form 
        onSubmit={onSubmitHandler} 
        onClick={(e) => e.stopPropagation()} 
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto w-full text-center">
          <span className="text-primary">User</span> {state === "login" ? " Login" : " Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              placeholder="Type here" 
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" 
              type="text" 
              required 
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            placeholder="Type here" 
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" 
            type="email" 
            required 
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            placeholder="Type here" 
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" 
            type="password" 
            required 
          />
        </div>

        {state === "register" ? (
          <p className="w-full text-center text-sm">
            Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer font-semibold">click here</span>
          </p>
        ) : (
          <p className="w-full text-center text-sm">
            Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer font-semibold">click here</span>
          </p>
        )}

        <button 
          type="submit"
          className="bg-primary hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer font-medium"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
