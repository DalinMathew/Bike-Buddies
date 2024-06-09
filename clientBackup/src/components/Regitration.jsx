import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";
import { FiUpload } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [uType, setUtype] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [pass, setPass] = useState();
  const [gender, setGender] = useState("Male"); // Default gender
  const [age, setAge] = useState();
  const [previewImage, setPreviewImage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(imageUrl);
  };

  const createUser = () => {
    //Pasted
    if (uType === "Staff") {
      toast.loading("Registering Staff");
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("employeeId", email);
      formData.append("firstName", name);
      formData.append("middleName", name);
      formData.append("lastName", name);
      formData.append("email", email);
      formData.append("password", pass);
      formData.append("phoneNumber", phone);
      formData.append("department", 'test');
      formData.append("experience", 0);
      formData.append("gender", 'na');
      formData.append("post", 'na');
      formData.append("type", "profile");
      formData.append("profile", file);
      formData.append("gender", gender);
    formData.append("age", age);



      axios
        .post(`${baseApiURL()}/faculty/details/addDetails`, formData, {
          headers: headers,
        })
        .then((response) => {
          toast.dismiss();
          if (response.data.success) {
            toast.success(response.data.message);
            axios
              .post(`${baseApiURL()}/faculty/auth/register`, {
                loginid: email,
                password: pass,
              })
              .then((response) => {
                toast.dismiss();
                if (response.data.success) {
                  toast.success(response.data.message);
                  setFile();
                  setPreviewImage();

                } else {
                  toast.error(response.data.message);
                }
              })
              .catch((error) => {
                toast.dismiss();
                toast.error(error.response.data.message);
              });
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.response.data.message);
        });
      //Pasted
    }
    else {
      toast.loading("Adding Student");
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("enrollmentNo", email);
      formData.append("firstName", name);
      formData.append("middleName", name);
      formData.append("lastName", name);
      formData.append("email", email);
      formData.append("password", pass);
      formData.append("phoneNumber", phone);
      formData.append("semester", 1);
      formData.append("branch", 'na');
      formData.append("gender", 'na');
      formData.append("type", "profile");
      formData.append("profile", file);
      axios
        .post(`${baseApiURL()}/student/details/addDetails`, formData, {
          headers: headers,
        })
        .then((response) => {
          toast.dismiss();
          if (response.data.success) {
            navigate("/login")
            toast.success(response.data.message);
            axios
              .post(`${baseApiURL()}/student/auth/register`, {
                loginid: email,
                password: pass,
              })
              .then((response) => {
                toast.dismiss();
                if (response.data.success) {
                  toast.success(response.data.message);
                  setFile();
                  setPreviewImage();
                } else {
                  toast.error(response.data.message);
                }
              })
              .catch((error) => {
                toast.dismiss();
                toast.error(error.response.data.message);
              });
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.response.data.message);
        });
    }
  }
  return (
    <div className="bg-white h-[100vh] w-full flex justify-between items-center">
      <img
        className="w-[60%] h-[100vh] object-cover"
        src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <div className="w-[40%] flex justify-center items-start flex-col pl-8">
        <p className="text-3xl font-semibold pb-2 border-b-2 border-green-500">
          Registration
        </p>
        <form
          className="flex justify-center items-start flex-col w-full mt-10"
          onSubmit={createUser}
        >
          {/* Existing form fields */}
          {/* Add gender selection */}
          <div className="flex flex-col w-[70%]">
            <label className="mb-1" htmlFor="gender">
              Gender
            </label>
            <select
              onChange={(e) => setGender(e.target.value)}
              value={gender}
              className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* Add age input */}
          <div className="flex flex-col w-[70%]">
            <label className="mb-1" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              id="age"
              required
              className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          {/* Existing form fields */}
          <button className="bg-blue-500 mt-5 text-white px-6 py-2 text-xl rounded-md hover:bg-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center">
            Register
            <span className="ml-2">
              <FiLogIn />
            </span>
          </button>
          <Link to="/login" className="text-blue-500 text-sm mt-2">
            Already have an account? Login
          </Link>
        </form>
      </div>
      <div className="absolute top-4 right-4"></div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Registration;