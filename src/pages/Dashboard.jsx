import { useEffect, useState } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { API_END_POINTS } from "../api";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import NoteCard from "./NoteCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const token = localStorage.getItem("token");

  const noteSchema = Yup.object().shape({
    title: Yup.string().trim().required("Title is required.")
      .max(50, "Reached Maximum Characters"),
    text: Yup.string().trim().required("Description is required.")
      .max(200, "Reached Maximum Characters"),
    date: Yup.string().required("Date is required."),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { title: "", text: "", date: "" },
    resolver: yupResolver(noteSchema),
    mode:"all",
    reValidateMode:"onBlur"
  });

  useEffect(() => {
    fetchNotes();
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    setUserLoading(true);
    try {
      const res = await axios.get(API_END_POINTS.auth.user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserDetails(res?.data?.user);
    } catch (err) {
      console.error("Failed to fetch user details:", err);
    } finally {
      setUserLoading(false);
    }
  };

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_END_POINTS.notes.getNotes, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res?.data);
    } catch (err) {
      console.error("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async values => {
    const { title, text, date } = values;
    try {
      if (editMode) {
        await axios.put(
          API_END_POINTS.notes.update,
          { title, content: text, date },
          {
            params: { id: editId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Swal.fire("Success", "Note updated successfully!", "success");
        setEditMode(false);
        setEditId(null);
      } else {
        await axios.post(
          API_END_POINTS.notes.create,
          { title, content: text, date },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire("Success", "Note created successfully!", "success");
      }

      reset();
      setModalOpen(false);
      fetchNotes();
    } catch (err) {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  const handleDelete = async id => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(API_END_POINTS.notes.delete, {
          params: { id },
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Deleted!", "Your note has been deleted.", "success");
        fetchNotes();
      } catch (err) {
        Swal.fire("Error", "Could not delete the note.", "error");
      }
    }
  };

  const handleEdit = note => {
    setValue("title", note.title || "");
    setValue("text", note.content || "");
    setValue("date", note.date?.slice(0, 10));
    setEditId(note._id);
    setEditMode(true);
    setModalOpen(true);
  };

  return (
    <>
    <Navbar userEmail={userDetails?.email || "Loading..."} isLoading={userLoading} data={notes} />
    <div className="min-h-screen bg-[url('/dots.svg')] bg-repeat bg-fixed bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Notes App</h1>
          <button
            onClick={() => {
              setEditMode(false);
              reset({ title: "", text: "", date: "" });
              setModalOpen(true);
            }}
            className="bg-blue-600 text-white p-4 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            aria-label="Add Note"
          >
            <FaPlus size={20} />
          </button>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-4">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative animate-fadeIn">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {editMode ? "Update Note" : "Add Note"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    {...register("date")}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>}
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    {...register("title")}
                    placeholder="e.g., Meeting Notes"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
                </div>

                <div>
                  <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="text"
                    {...register("text")}
                    placeholder="Write your note here..."
                    className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                  {errors.text && <p className="text-sm text-red-500 mt-1">{errors.text.message}</p>}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    {editMode ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <p className="mt-4 text-gray-500 text-center">Loading...</p>
        ) : notes.length === 0 ? (
          <p className="mt-4 text-gray-500 text-center">No notes yet. Create your first note!</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {notes.map(note => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
