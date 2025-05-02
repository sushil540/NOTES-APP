import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-yellow-200 p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs text-gray-600">
          {new Date(note.date).toLocaleDateString()}
        </div>
        <div className="flex gap-4">
          <button onClick={() => onEdit(note)} className="text-blue-600 hover:text-blue-800">
            <FaEdit size={18} />
          </button>
          <button onClick={() => onDelete(note._id)} className="text-red-600 hover:text-red-800">
            <FaTrash size={18} />
          </button>
        </div>
      </div>
      <h4 className="font-semibold text-lg mb-1 break-words">{note.title}</h4>
      <p className="mb-2 break-words">{note.content}</p>
    </div>
  );
}
