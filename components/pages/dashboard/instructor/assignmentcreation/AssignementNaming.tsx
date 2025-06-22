"use client"
import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { InputErrorMessage } from '../../../../utils/error'

type AssignmentProps = {
  register: any;
  setValue: any;
  errors: any;
}

const AssignementNaming = ({ register, setValue, errors }: AssignmentProps) => {
  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p></p>', // Start with empty paragraph
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue("description", html, { shouldValidate: true });
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none min-h-[150px] p-2",
      },
    },
  });

  useEffect(() => {
    register("description", { 
      required: "Description is required",
      validate: (value: string) => 
        value && value.trim().length > 0 || "Description cannot be empty"
    });

    return () => {
      editor?.destroy();
    };
  }, [register, editor]); // Added editor to dependencies

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 items-center">
        <div className="lg:col-span-3 col-span-12">
          <p className="font-semibold text-base">Assignment Name</p>
        </div>
        <div className="lg:col-span-7 col-span-12">
          <input
            type="text"
            className="mt-3 w-full p-3 border-none rounded-lg shadow-sm"
            style={{
              background: "#FFFFFF",
              boxShadow: "0px 1px 15px rgba(0, 0, 0, 0.15)",
            }}
            placeholder="Enter Name"
            {...register("name", { required: true })}
          />
          <div>
            {errors.name && <InputErrorMessage message="Enter Assignment Name" />}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-semibold text-base">Description</label>
        <div className="rounded-lg border border-gray-200 bg-white">
          <EditorContent editor={editor} />
        </div>
        {errors.description && (
          <InputErrorMessage message={errors.description.message} />
        )}
      </div>
    </div>
  );
};

export default AssignementNaming;