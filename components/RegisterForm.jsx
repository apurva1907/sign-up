"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, 
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (

    <div>
        {/* Container at the top with shadow */}
        <div style={{ 
          height: '90px',
          boxShadow: '3px 0px 16px rgba(0, 0, 0, 0.5)',
          backgroundColor: 'white',
          position: 'relative', // Needed for positioning the logo
        }}>
    
       <img
        src="https://static.wixstatic.com/media/9ecf7a_bc1e2afa5a684e41ab1ef3e3189089d6~mv2.png/v1/crop/x_0,y_365,w_1080,h_315/fill/w_926,h_270,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Add%20a%20heading%20(1).png"
        alt="Add a heading (1).png"
        style={{ 
          width: '300px', 
          height: 'auto',
          position: 'absolute',
          top: 5,
          left: 10,
           }}
        ></img>
        </div>
    
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#fffdf8' }}>
    
        <form onSubmit={handleSubmit} style={{ maxWidth: '800px', width: '100%', padding: '50px', border: '0px solid #ccc', borderRadius: '5px', backgroundColor: '#ffffff' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333333' }}>Sign Up for ImpactBoard</h2>
    
    
          <nav style={{ backgroundColor: '#ffffff', padding: '10px', marginBottom: '50px', }}>
            <ul className="menu-bar" style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
              <li>
                <Link href="/signup">
                Register
                </Link>
              </li>
              <li>
                <Link href="/verification">
                  Verify
                </Link>
              </li>
              <li>
                <Link href="/details">
                  Details
                </Link>
              </li>
              <li>
                <Link href="/statement">
                  Privacy statement
                </Link>
              </li>
            </ul>
          </nav>
          <div style={{ marginBottom: '40px' }}>
            <label htmlFor="email" style={{ color: '#333333' }}>Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Impactboard Team"
                onChange={(e) => setName(e.target.value)}
                style={{ color: '#333333', width: '100%', padding: '10px', fontSize: '16px' }}
              />
            </div>
          <div style={{ marginBottom: '40px' }}>
            <label htmlFor="email" style={{ color: '#333333' }}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              style={{ color: '#333333', width: '100%', padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '40px' }}>
            <label htmlFor="password" style={{ color: '#333333' }}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(e) => setPassword(e.target.value)}
              style={{ color: '#333333', width: '100%', padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#99c170', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Register
            </button>
          </div>
          <div>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px', color: '#333333' }}>
          Already have an account?{' '}
            <Link href={"/"}>
              Sign In
            </Link>
          </div>
        </form>
      </div>
      </div>
    );

  }
