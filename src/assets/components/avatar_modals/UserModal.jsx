import { useData } from "../DataContext";
import { putData } from "../../helpers/update";
import { useEffect, useState } from "react";
import EmailInput from "../inputs/EmailInput";
import AvatarInput from "../inputs/AvatarInput";
import CurrentPasswordInput from "../inputs/CurrentPasswordInput";
import NewPasswordInput from "../inputs/NewPasswordInput";
import UpdateConfirmPassword from "../inputs/UpdateConfirmPassword";
import { useForm } from "react-hook-form";

const UserModal = () => {
  const {
    currentUser,
    setSuccess,
    setCurrentUser,
    setUserModal,
    logout,
    setError,
    setAvatar,
    encodedPassword,
  } = useData();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    watch
  } = useForm();

  const [passwordError, setPasswordError] = useState("");
  const [passwordModal, setPasswordModal] = useState(false);

  const verifyCurrentPassword = (currentPassword) => {
    const encodedCurrentPassword = encodedPassword(currentPassword);
    return currentUser.password === encodedCurrentPassword;
  };


  const onSubmit = async (data) => {
    try {
      const updateData = {
        email: data.email,
        avatar: data.avatar || "/avatar.jpg",
      };

      const updatedUser = await putData(currentUser.id, updateData);

      if (updatedUser) {
        setCurrentUser(updatedUser);
        if (updatedUser.avatar) {
          setAvatar(updatedUser.avatar);
        }
        if(updatedUser.avatar === "") {
          setAvatar("/avatar.jpg")
        }
        setSuccess("Your details have been successfully updated");
        setUserModal(false);
        setTimeout(() => {
          setSuccess("");
        }, 2500);
      } else {
        throw new Error("No data received from update");
      }
    } catch (error) {
      setError(error.message || "Failed to update user");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const onSubmitPassword = async (data) => {
    if (passwordError) return;

    try {
      if (!verifyCurrentPassword(data.currentPassword)) {
        setPasswordError("Current password is incorrect");
        setTimeout(() => {
          setPasswordError("");
        }, 3000);
        return;
      }

      if (data.newPassword !== data.confirmPassword) {
        setPasswordError("New passwords don't match");
        setTimeout(() => {
          setPasswordError("");
        }, 3000);
        return;
      }

      if (data.newPassword) {
        data.password = encodedPassword(data.newPassword);
      }

      await putData(currentUser.id, { password: data.password });
      setSuccess("Password updated successfully");
      setPasswordModal(false);
      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (error) {
      setError(error.message || "Failed to update password");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  useEffect(() => {
    if (currentUser) {
      const { avatar, email } = currentUser;
      reset();
      setValue("email", email);
      setValue("avatar", avatar === "/avatar.jpg" ? "" : avatar);
    }
  }, [currentUser, reset, setValue]);

  return (
    <div className="">
      <div className="phone:flex phone:justify-center">
          <div className="tablet:min-w-[25rem] tablet:min-h-[23.3125rem] bg-figma-semi-dark-blue rounded-[1.25rem] tablet:p-[2rem] phone:p-[1.5rem] phone:flex phone:flex-col phone:min-w-[20.4375rem] phone:min-h-[22.8125rem]">
            <form
              className=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex justify-between">
                <h2 className="figma-heading-l text-white pb-[2.5rem]">Update</h2>
                <img
                  src={currentUser?.avatar || "/avatar.jpg"}
                  alt="profile"
                  className="w-[2.5rem] h-[2.5rem] rounded-[2.5rem] border border-figma-white"
                />
              </div>
              <EmailInput register={register} errors={errors} />
              <AvatarInput register={register} errors={errors} />
              <button
                className="bg-figma-red text-figma-white tablet:w-[21rem] h-[3rem] phone:w-[17.4375rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
                type="submit"
              >
                Update
              </button>
              <button
                className="block bg-figma-red text-figma-white tablet:w-[21rem] h-[3rem] phone:w-[17.4375rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
                onClick={() => setPasswordModal((prev) => !prev)}
                type="button"
              >
                Password Menu
              </button>
            </form>
            {passwordModal && (
              <form     className={`transition-all duration-[5s] ease-in-out transform ${
                passwordModal ? "" : ""
              }`}
              onSubmit={handleSubmit(onSubmitPassword)}>
                <CurrentPasswordInput register={register} errors={errors} />
                <NewPasswordInput register={register} errors={errors} />
                <UpdateConfirmPassword
                  register={register}
                  errors={errors}
                  watch={watch}
                />
                <button
                  className="bg-figma-red text-figma-white tablet:w-[21rem] h-[3rem] phone:w-[17.4375rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
                  type="submit"
                >
                  Change Password
                </button>
              </form>
            )}
            <button
              className="bg-figma-red text-figma-white tablet:w-[21rem] h-[3rem] phone:w-[17.4375rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
              onClick={() => logout()}
              type="button"
            >
              Logout
            </button>
          </div>
      </div>
    </div>
  );
};

export default UserModal;
