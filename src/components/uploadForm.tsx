import { useState } from "react";
import addStory from "@/api/addStory";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const avatars = [
  { value: "avatar1", src: "/avatar1.png", alt: "Avatar 1" },
  { value: "avatar2", src: "/avatar2.png", alt: "Avatar 2" },
  { value: "avatar3", src: "/avatar3.png", alt: "Avatar 3" },
];

const FormComponent = () => {
  const avatar = avatars.find((avatar) => avatar.value === selectedAvatar);

  const fields = [
    "Arts",
    "Business & Law",
    "Exploration",
    "Humanities",
    "Institutions",
    "Public Figure",
    "Science & Technology",
    "Sports",
    "Student",
    "Other",
  ];
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const handleavatar = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAvatar(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [formData, setFormData] = useState({
    avatar: "",
    name: "",
    profession: "",
    description: "",
    birthDate: "",
  });
  const { user } = useAuth();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("User is not authenticated");
      return;
    }
    const completeFormData = {
      slug: formData.name,
      img: formData.avatar, // or any default value
      occupation: formData.profession,
      birthdate: formData.birthDate,
      description: formData.description,
      uploadBY: user.displayName || "Anonymous", // replace with actual user info
    };
    const status = await addStory(completeFormData, user);
    if (status === true) {
      alert("Story added successfully");
      console.error("Story added");
    } else {
      alert("Error adding story");

      console.error("Failed to add story");
    }
    // navigate("/herNearby");
    // window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-4/5 max-w-5xl p-6 rounded-lg text-white mx-auto"
    >
      <label className="block mb-4">
        <span className="text-gray-300">Avatar</span>
        <select
          name="avatar"
          value={selectedAvatar}
          onChange={handleavatar}
          className="mt-1 block w-1/2 bg-gray-700 border border-gray-600 text-white rounded-md"
          required
        >
          <option value="">Select an Avatar</option>
          {avatars.map((avatar) => (
            <option key={avatar.value} value={avatar.value}>
              {avatar.alt}
            </option>
          ))}
        </select>

        <div>
          {avatar && (
            <Image
              src={avatar.src}
              alt={avatar.alt}
              width={48} // 设置图片宽度（12 * 4 = 48 像素）
              height={48} // 设置图片高度（12 * 4 = 48 像素）
              className="rounded-full"
            />
          )}
        </div>
      </label>

      <label className="block mb-4">
        <span className="text-gray-300">Name</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-1/2 bg-gray-700 border border-gray-600 text-white rounded-md"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-300">Profession</span>
        <select
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          className="mt-1 block w-1/2 bg-gray-700 border border-gray-600 text-white rounded-md"
          required
        >
          {fields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        <span className="text-gray-300">Description</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full h-32 bg-gray-700 border border-gray-600 text-white rounded-md"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-300">Birth Date (optional)</span>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className="mt-1 block w-1/2 bg-gray-700 border border-gray-600 text-white rounded-md"
        />
      </label>
      <button
        type="submit"
        className="w-fit  bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
