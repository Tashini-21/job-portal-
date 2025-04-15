import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null); // for storing uploaded file
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const {setShowRecruiterLogin} = useContext(AppContext)

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (state === "Sign Up" && !isTextDataSubmitted) {
      setIsTextDataSubmitted(true);
      return;
    }
     
   
      

    // Final submit action
    const formData = {
      name,
      email,
      password,
      image,
    };

    console.log("Form submitted:", formData);

    // Reset if needed
    setName("");
    setEmail("");
    setPassword("");
    setImage(null);
    setIsTextDataSubmitted(false);
    if (state === "Sign Up") setState("Login");
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-[90%] max-w-md"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium mb-2">
          Recruiter {state}
        </h1>
        <p className="text-sm mb-4 text-center">
          Welcome {state === "Login" ? "back" : ""}! Please{" "}
          {state === "Login" ? "sign in" : "register"} to continue
        </p>

        {/* Sign Up - Step 2: Upload logo */}
        {state === "Sign Up" && isTextDataSubmitted && (
          <div className="flex flex-col items-center gap-4 my-10">
            <label className="cursor-pointer">
              <img src={ image ? URL.createObjectURL(image):assets.upload_area} alt="upload" className="w-16 rounded-full" />
              <input
                type="file"
                id="image"
                hidden
                onChange={e=>setImage(e.target.files[0])}
              />
            </label>
            <p className="text-center text-sm">Upload Company <br /> logo</p>
            {image && (
              <p className="text-xs text-green-600">{image.name} selected</p>
            )}
          </div>
        )}

        {/* Sign Up - Step 1: Company Name */}
        {state === "Sign Up" && !isTextDataSubmitted && (
          <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-3">
            <img src={assets.person_icon} alt="person" />
            <input
              className="outline-none text-sm w-full"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Company Name"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="email" />
          <input
            className="outline-none text-sm w-full"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
          />
        </div>

        {/* Password */}
        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="lock" />
          <input
            className="outline-none text-sm w-full"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        {state === "Login" && (
          <p className="text-sm text-blue-600 my-4 cursor-pointer">
            Forget Password?
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-full mt-4"
        >
          {state === "Login"
            ? "Login"
            : isTextDataSubmitted
            ? "Create Account"
            : "Next"}
        </button>

        {/* Toggle */}
        {state === "Login" ? (
          <p className="mt-5 text-center text-sm">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                setState("Login");
                setIsTextDataSubmitted(false);
              }}
            >
              Login
            </span>
          </p>
        )}

        <img onClick={e => setShowRecruiterLogin(false)} className="absolute top-5 right-5 cursor-pointer"src={assets.cross_icon} alt="" />
      </form>
    </div>
  );
};

export default RecruiterLogin;
