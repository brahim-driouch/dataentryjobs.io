"use client";

import { JobFormData } from '@/types/jobs';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';

interface JobDescriptionTabProps {
  formData: JobFormData;
  updateFormData: (data: Partial<JobFormData>) => void;
}

// Toolbar component for the editor
const EditorToolbar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="border-b bg-gray-50 p-3 flex gap-1 flex-wrap">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive('bold') ? 'bg-gray-300' : ''
        }`}
        title="Bold"
      >
        <strong className="text-sm">B</strong>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive('italic') ? 'bg-gray-300' : ''
        }`}
        title="Italic"
      >
        <em className="text-sm">I</em>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive('bulletList') ? 'bg-gray-300' : ''
        }`}
        title="Bullet List"
      >
        <span className="text-sm">•</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive('orderedList') ? 'bg-gray-300' : ''
        }`}
        title="Numbered List"
      >
        <span className="text-sm">1.</span>
      </button>
    </div>
  );
};

// Simple textarea component (no rich text editor needed for arrays)
const SimpleTextarea = ({
  value,
  onChange,
  placeholder,
  name,
  rows = 6
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  name: string;
  rows?: number;
}) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
      placeholder={placeholder}
    />
  );
};

// Individual editor component with SSR handling (for description only)
const RichTextEditor = ({
  value,
  onChange,
  placeholder,
  name
}: {
  value: string;
  onChange: (value: string, name: string) => void;
  placeholder: string;
  name: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html, name);
    },
    editorProps: {
      attributes: {
        class: 'min-h-[200px] p-4 focus:outline-none prose prose-sm max-w-none',
        placeholder: placeholder,
      },
    },
    immediatelyRender: false,
  });

  // Don't render editor during SSR
  if (!isMounted) {
    return (
      <div className="border border-gray-300 rounded-md min-h-[200px] p-4 bg-gray-50">
        <div className="text-gray-500 text-sm">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

const JobDescriptionTab: React.FC<JobDescriptionTabProps> = ({ formData, updateFormData }) => {
  const handleEditorChange = (value: string, fieldName: string) => {
    updateFormData({ [fieldName]: value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Job Description & Requirements
      </h2>

      <div className="space-y-6">
        {/* Job Description - Rich Text Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description *
          </label>
          <RichTextEditor
            value={formData.description}
            onChange={handleEditorChange}
            placeholder="Describe the role, team, company culture, and overall purpose of this position..."
            name="description"
          />
          <p className="text-xs text-gray-500 mt-1">
            Provide a comprehensive overview of the position and what makes it unique
          </p>
        </div>

        {/* Key Responsibilities - Plain Textarea (converted to array on submit) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Responsibilities *
          </label>
          <SimpleTextarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleTextareaChange}
            placeholder="Enter one responsibility per line:
&#10;- Accurately enter data into company systems
- Review and verify data for completeness
- Maintain confidentiality of sensitive information
- Generate reports as needed"
            rows={8}
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter each responsibility on a new line. These will be displayed as bullet points.
          </p>
        </div>

        {/* Requirements - Plain Textarea (converted to array on submit) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Requirements *
          </label>
          <SimpleTextarea
            name="requirements"
            value={formData.requirements}
            onChange={handleTextareaChange}
            placeholder="Enter one requirement per line:
&#10;- High school diploma or equivalent
- Minimum 2 years data entry experience
- Proficient in Microsoft Excel
- Strong attention to detail
- Excellent typing speed (60+ WPM)"
            rows={8}
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter each requirement on a new line. These will be displayed as bullet points.
          </p>
        </div>

        {/* Skills - Comma or newline separated */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Required Skills *
          </label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleTextareaChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Data Entry, Excel, Typing, Attention to Detail, Time Management"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate skills with commas or new lines
          </p>
        </div>

        {/* Certifications - Optional */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Certifications (Optional)
          </label>
          <textarea
            name="certifications"
            value={formData.certifications || ''}
            onChange={handleTextareaChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Certified Data Entry Specialist, Microsoft Office Specialist"
          />
          <p className="text-xs text-gray-500 mt-1">
            List any relevant certifications (comma or newline separated)
          </p>
        </div>

        {/* Language Requirements - Optional */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language Requirements (Optional)
          </label>
          <textarea
            name="language_requirements"
            value={formData.language_requirements || ''}
            onChange={handleTextareaChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="English (Fluent), Spanish (Conversational)"
          />
          <p className="text-xs text-gray-500 mt-1">
            List required languages and proficiency levels (comma or newline separated)
          </p>
        </div>
      </div>
    </section>
  );
};

export default JobDescriptionTab;