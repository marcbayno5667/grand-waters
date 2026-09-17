import * as React from "react";
import { Plus, X } from "lucide-react";
import { SnackbarProps } from "../Snackbar/Snackbar";
import Snackbar from "../Snackbar/Snackbar.widget";

export const AddProject = ({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (
    category: string,
    title: string,
    description: string,
    location: string,
    photos: File[]
  ) => Promise<void>;
}) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [category, setCategory] = React.useState("FILTRATION");
  const [photos, setPhotos] = React.useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = React.useState<string[]>([]);
  const [saving, setSaving] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState<SnackbarProps>({
    open: false,
    type: "success",
    message: "",
  });

  // ==========================================
  // PHOTO SELECTION
  // ==========================================

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    if (files.length > 10) {
      setSnackbar({
        open: true,
        type: "error",
        message: "You can upload a maximum of 10 photos.",
      });
      return;
    }

    // Check file sizes
    const oversizedFile = files.find((file) => file.size > 5 * 1024 * 1024);

    if (oversizedFile) {
      setSnackbar({
        open: true,
        type: "error",
        message: `"${oversizedFile.name}" is larger than 5 MB.`,
      });
      return;
    }

    setPhotos(files);

    // Create previews
    const previews = files.map((file) => URL.createObjectURL(file));

    setPhotoPreviews(previews);
  };

  // ==========================================
  // REMOVE PHOTO
  // ==========================================

  const removePhoto = (index: number) => {
    setPhotos((current) => current.filter((_, i) => i !== index));

    setPhotoPreviews((current) => {
      const url = current[index];

      if (url) {
        URL.revokeObjectURL(url);
      }

      return current.filter((_, i) => i !== index);
    });
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Please enter a project title.",
      });
      return;
    }

    if (!description.trim()) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Please enter a project description.",
      });
      return;
    }

    if (!location.trim()) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Please enter the project location..",
      });
      return;
    }

    if (!category) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Please enter a project category.",
      });
      return;
    }

    if (photos.length === 0) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Please select at least one project photo.",
      });
      return;
    }

    try {
      setSaving(true);

      await onAdd(
        category,
        title.trim(),
        description.trim(),
        location.trim(),
        photos
      );

      onClose();
    } catch (error) {
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // CLEANUP PREVIEW URLS
  // ==========================================

  React.useEffect(() => {
    return () => {
      photoPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

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
              Add New Project
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Add a project to your portfolio
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition"
          >
            <X size={17} />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            {/* TITLE */}

            <div>
              <label className="block text-[10px] font-bold text-[#1558cb] uppercase tracking-widest mb-2">
                Project Title *
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Industrial Filtration System"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb]"
              />
            </div>

            {/* CATEGORY + LOCATION */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* CATEGORY */}

              <div>
                <label className="block text-[10px] font-bold text-[#1558cb] uppercase tracking-widest mb-2">
                  Category *
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-semibold text-gray-900 bg-white focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb]"
                >
                  <option value="FILTRATION">FILTRATION</option>

                  <option value="RO SYSTEM">RO SYSTEM</option>

                  <option value="SOFTENER">SOFTENER</option>
                </select>
              </div>

              {/* LOCATION */}

              <div>
                <label className="block text-[10px] font-bold text-[#1558cb] uppercase tracking-widest mb-2">
                  Location *
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Cebu City"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb]"
                />
              </div>
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="block text-[10px] font-bold text-[#1558cb] uppercase tracking-widest mb-2">
                Description *
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this project..."
                rows={5}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-600 leading-relaxed resize-none focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb]"
              />
            </div>

            {/* PROJECT PHOTOS */}

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[10px] font-bold text-[#1558cb] uppercase tracking-widest">
                  Project Photos *
                </label>

                <span className="text-[10px] text-gray-400">
                  {photos.length}/10 photos
                </span>
              </div>

              <label className="block cursor-pointer">
                <div className="min-h-36 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#1558cb] transition bg-gray-50 p-3">
                  {photoPreviews.length > 0 ? (
                    <div className="grid grid-cols-4 gap-2">
                      {photoPreviews.map((preview, index) => (
                        <div
                          key={preview}
                          className="relative aspect-square rounded-lg overflow-hidden group"
                        >
                          <img
                            src={preview}
                            alt={`Project photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removePhoto(index);
                            }}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                          >
                            <X size={12} />
                          </button>

                          {index === 0 && (
                            <span className="absolute bottom-1 left-1 bg-[#1558cb] text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                              COVER
                            </span>
                          )}
                        </div>
                      ))}

                      {photos.length < 10 && (
                        <div className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
                          <Plus size={20} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-28 flex flex-col items-center justify-center text-center">
                      <Plus size={26} className="text-gray-400 mb-2" />

                      <p className="text-xs font-bold text-gray-500">
                        Choose Project Photos
                      </p>

                      <p className="text-[10px] text-gray-400 mt-1">
                        JPG, PNG or WebP · Max 10 photos · 5 MB each
                      </p>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  multiple
                  className="hidden"
                  onChange={handlePhotosChange}
                />
              </label>

              <p className="text-[10px] text-gray-400 mt-2">
                The first photo will be used as the project cover.
              </p>
            </div>
          </div>

          {/* FOOTER */}

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2.5 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-lg bg-[#1558cb] text-white text-sm font-bold hover:bg-[#1049a8] transition disabled:opacity-50"
            >
              {saving ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
