import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const SignUp = () => {

  const {register,handleSubmit,formState: {errors}} = useForm();
  const {createUser} = useContext(AuthContext);

  const onSubmit = data => {
    console.log(data);
    createUser(data.email,data.password)
    .then(result => {
      const loggedUser= result.user;
      console.log(loggedUser);
  
    })
  }
  return (
    <>
      <Helmet>
        <title>PH Care | Sign Up </title>
      </Helmet> 
        <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">SignUp Now!</h1>
          <p className="py-6">
            You need to SignUp!
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                name="name"
                placeholder="name"
                className="input input-bordered"
                />
                {errors.name && <span className="text-red-600">This field is required</span>}
              
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                name="email"
                placeholder="email"
                className="input input-bordered"
               
              />
               {errors.email && <span className="text-red-600">This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                {...register("password",{required:true, minLength:6, maxLength:20,
                  pattern:/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/
                })}
                placeholder="password"
                className="input input-bordered"
                
              />
              {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
              <label className="label">
              {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 chracters</p>}
              {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have 1 upper case,1 lower case, 1 number and 1 special character.</p>}
         
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Sign Up" />           
            </div>
          </form>
          <p><small>Already have an account <Link to='/login'>Login</Link> </small></p>
        </div>
      </div>
    </div>    
    </>
  );
};

export default SignUp;
