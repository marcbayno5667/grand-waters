import * as React from "react";
import { Plus } from "lucide-react";
import { SnackbarProps } from "../Snackbar/Snackbar";
import Snackbar from "../Snackbar/Snackbar.widget";

export const AddService = ({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (
    title: string,
    description: string,
    image: File,
    icon?: File
  ) => Promise<void>;
}) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [snackbar, setSnackbar] = React.useState<SnackbarProps>({
    open: false,
    type: "success",
    message: "",
  });

  const [image, setImage] = React.useState<File | null>(null);
  const [icon, setIcon] = React.useState<File | null>(null);

  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [iconPreview, setIconPreview] = React.useState<string | null>(null);

  const [saving, setSaving] = React.useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setIcon(file);
    setIconPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Please enter title.",
      });
      return;
    }

    if (!description.trim()) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Please enter description.",
      });
      return;
    }

    if (!image) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Please add image.",
      });
      return;
    }

    try {
      setSaving(true);

      await onAdd(title.trim(), description.trim(), image, icon ?? undefined);

      onClose();
    } catch (error) {
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <Snackbar
        open={snackbar.open}
        type={snackbar.type}
        message={snackbar.message}
        onClose={() =>
          setSnackbar((current) => ({
            ...current,
            open: false,
          }))
        }
      />
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 pt-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-black text-gray-900">
              Add New Service
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center text-lg"
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            {/* TITLE */}
            <div>
              <label className="block text-[10px] font-bold text-[#1558cb] uppercase tracking-widest mb-2">
                Service Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Water Filtration System"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb]"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-[10px] font-bold text-[#1558cb] uppercase tracking-widest mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this service..."
                rows={5}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-600 leading-relaxed resize-none focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* SERVICE IMAGE */}
              <div>
                <label className="block text-[10px] font-bold text-[#1558cb] uppercase tracking-widest mb-2">
                  Service Image *
                </label>

                <label className="block cursor-pointer">
                  <div className="h-40 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#1558cb] transition overflow-hidden flex items-center justify-center bg-gray-50">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Service preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Plus
                          size={24}
                          className="mx-auto text-gray-400 mb-2"
                        />

                        <p className="text-xs font-bold text-gray-500">
                          Choose Service Image
                        </p>

                        <p className="text-[10px] text-gray-400 mt-1">
                          JPG, PNG or WebP
                        </p>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {/* SERVICE ICON */}
              <div>
                <label className="block text-[10px] font-bold text-[#1558cb] uppercase tracking-widest mb-2">
                  Service Icon
                </label>

                <label className="block cursor-pointer">
                  <div className="h-40 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#1558cb] transition flex items-center justify-center bg-gray-50 overflow-hidden">
                    {iconPreview ? (
                      <img
                        src={iconPreview}
                        alt="Icon preview"
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <Plus
                          size={24}
                          className="mx-auto text-gray-400 mb-2"
                        />

                        <p className="text-xs font-bold text-gray-500">
                          Choose Service Icon
                        </p>

                        <p className="text-[10px] text-gray-400 mt-1">
                          Optional
                        </p>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleIconChange}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2.5 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-lg bg-[#1558cb] text-white text-sm font-bold hover:bg-[#1049a8] transition disabled:opacity-50"
            >
              {saving ? "Creating..." : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
