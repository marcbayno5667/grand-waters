import * as React from "react";
import { MapPin, Pencil, Trash2, ImagePlus, ArrowRight, X } from "lucide-react";
import { API_ENDPOINT, API_HEADER } from "@/app/utils/constants";
import { SectionLabel } from "@/app/utils/services";
import { SnackbarProps } from "../Snackbar/Snackbar";
import { Snackbar } from "../Snackbar/Snackbar.widget";
import AddProject from "./AddProject.widget";

interface ProjectData {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  photos: string[];
}

function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectData;
  onClose: () => void;
}) {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const [current, setCurrent] = React.useState(0);
  const total = project.photos.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
      style={{ background: "rgba(5,10,25,0.85)", backdropFilter: "blur(6px)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Main photo + controls */}
        <div className="relative" style={{ height: "300px" }}>
          {project.photos.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${project.title} ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
          >
            <X size={16} />
          </button>

          {/* Prev / Next */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
          >
            <ArrowRight size={15} className="rotate-180" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
          >
            <ArrowRight size={15} />
          </button>

          {/* Title + badge */}
          <div className="absolute bottom-4 left-5 right-16">
            <span className="inline-block bg-[#1558cb] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
              {project.category}
            </span>
            <h3 className="text-white font-black text-xl leading-tight">
              {project.title}
            </h3>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-4 right-5 flex gap-1.5">
            {project.photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === current ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 px-5 pt-4">
          {project.photos.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-lg overflow-hidden shrink-0 transition-all ${
                i === current
                  ? "ring-2 ring-[#1558cb] opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
              style={{ width: 64, height: 48 }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Description */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
            <MapPin size={11} />
            <span>{project.location}</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {project.description}
          </p>
          <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="text-xs font-bold text-[#1558cb] hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectEditModal({
  project,
  onSave,
  onClose,
}: {
  project: ProjectData;
  onSave: (updated: ProjectData) => void;
  onClose: () => void;
}) {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const [form, setForm] = React.useState({
    title: project.title,
    location: project.location,
    category: project.category,
    description: project.description,
  });
  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    onSave({ ...project, ...form });
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-[110] flex items-center justify-center px-4"
      style={{ background: "rgba(5,10,25,0.85)", backdropFilter: "blur(6px)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-[#1558cb] px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-black text-base">Edit Project</h2>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
              Title
            </label>
            <input
              value={form.title}
              onChange={set("title")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={set("category")}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition"
              >
                <option value="FILTRATION">FILTRATION</option>
                <option value="RO SYSTEM">RO SYSTEM</option>
                <option value="SOFTENER">SOFTENER</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                Location
              </label>
              <input
                value={form.location}
                onChange={set("location")}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={5}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 leading-relaxed focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition resize-none"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-600 font-bold text-sm py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-[#1558cb] hover:bg-blue-700 text-white font-bold text-sm py-2.5 rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Project: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [projects, setProjects] = React.useState<ProjectData[]>([]);
  const [showAddProject, setShowAddProject] = React.useState(false);
  const [selectedProject, setSelectedProject] =
    React.useState<ProjectData | null>(null);
  const [editingProject, setEditingProject] =
    React.useState<ProjectData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [deleteProjectId, setDeleteProjectId] = React.useState<number | null>(
    null
  );
  const [snackbar, setSnackbar] = React.useState<SnackbarProps>({
    open: false,
    type: "success",
    message: "",
  });

  // ==========================================
  // GET PROJECTS
  // ==========================================

  const loadProjects = React.useCallback(async () => {
    try {
      setLoading(true);
      // setError(null);

      const response = await fetch(`${API_ENDPOINT}/api/projects`);

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to load projects");
      }

      setProjects(result.projects || []);
    } catch (error) {
      // setError(
      //   error instanceof Error ? error.message : "Failed to load projects"
      // );
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = async (
    category: string,
    title: string,
    description: string,
    location: string,
    photos: File[]
  ) => {
    const formData = new FormData();

    formData.append("category", category);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);

    photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    const response = await fetch(`${API_ENDPOINT}/api/projects`, {
      method: "POST",
      headers: API_HEADER,
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to create project");
    }

    setProjects((current) => [...current, result.project]);
    setSnackbar({
      open: true,
      type: "success",
      message: "Project added successfully.",
    });
  };

  React.useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // ==========================================
  // UPDATE PROJECT
  // ==========================================

  const updateProject = async (updatedProject: ProjectData) => {
    try {
      const formData = new FormData();

      formData.append("category", updatedProject.category);

      formData.append("title", updatedProject.title);

      formData.append("description", updatedProject.description);

      formData.append("location", updatedProject.location);

      const response = await fetch(
        `${API_ENDPOINT}/api/projects/${updatedProject.id}`,
        {
          method: "PATCH",
          headers: API_HEADER,
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update project");
      }

      await loadProjects();

      setEditingProject(null);

      setSnackbar({
        open: true,
        type: "success",
        message: "Project updated successfully.",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Failed to update project.",
      });
    }
  };

  // ==========================================
  // DELETE PROJECT
  // ==========================================

  const removeProject = async (projectId: number) => {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/projects/${projectId}`,
        {
          method: "DELETE",
          headers: API_HEADER,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete project");
      }

      setProjects((currentProjects) =>
        currentProjects.filter((item) => item.id !== projectId)
      );

      if (selectedProject?.id === projectId) {
        setSelectedProject(null);
      }

      setSnackbar({
        open: true,
        type: "success",
        message: "Project deleted successfully.",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Failed to delete project",
      });
    }
  };

  // ==========================================
  // REPLACE PHOTO
  // ==========================================

  const replaceImage = async (project: ProjectData, files: File[]) => {
    try {
      if (files.length === 0) return;

      if (files.length > 10) {
        setSnackbar({
          open: true,
          type: "warning",
          message: "You can upload a maximum of 10 photos.",
        });
        return;
      }

      // Check file sizes
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          setSnackbar({
            open: true,
            type: "warning",
            message: `${file.name} is larger than 5MB.`,
          });
          return;
        }
      }

      const formData = new FormData();

      // Tell backend this is a COMPLETE replacement
      formData.append("category", project.category);
      formData.append("title", project.title);
      formData.append("description", project.description);
      formData.append("location", project.location);

      // Add ALL newly selected photos
      files.forEach((file) => {
        formData.append("photos", file);
      });

      const response = await fetch(
        `${API_ENDPOINT}/api/projects/${project.id}`,
        {
          method: "PATCH",
          headers: API_HEADER,
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to replace project photos");
      }

      // Replace the project in frontend state
      setProjects((currentProjects) =>
        currentProjects.map((currentProject) =>
          currentProject.id === project.id ? result.project : currentProject
        )
      );

      setSnackbar({
        open: true,
        type: "success",
        message: `Successfully replaced project photos with ${
          files.length
        } new photo${files.length > 1 ? "s" : ""}.`,
      });
    } catch (error) {
      setSnackbar({
        open: true,
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to replace project photos.",
      });
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <SectionLabel text="Our Work" />

          <h2 className="font-black text-3xl lg:text-4xl text-gray-900">
            Projects
          </h2>
        </div>

        <div className="py-12 text-center text-gray-400">
          Loading projects...
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <>
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

      <Snackbar
        open={deleteProjectId !== null}
        type="warning"
        message="Are you sure you want to delete this project? All project photos will also be permanently deleted."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (deleteProjectId !== null) {
            removeProject(deleteProjectId);
          }

          setDeleteProjectId(null);
        }}
        onCancel={() => {
          setDeleteProjectId(null);
        }}
        onClose={() => {
          setDeleteProjectId(null);
        }}
      />
      {/* VIEW PROJECT MODAL */}

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* EDIT PROJECT MODAL */}

      {editingProject && (
        <ProjectEditModal
          project={editingProject}
          onSave={updateProject}
          onClose={() => setEditingProject(null)}
        />
      )}

      {showAddProject && (
        <AddProject
          onClose={() => setShowAddProject(false)}
          onAdd={createProject}
        />
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <SectionLabel text="Our Work" />

          <h2 className="font-black text-3xl lg:text-4xl text-gray-900">
            Projects
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative rounded-xl overflow-hidden group cursor-pointer aspect-square"
              onClick={() => {
                if (!isAdmin) {
                  setSelectedProject(project);
                }
              }}
            >
              {/* COVER PHOTO */}

              {project.photos.length > 0 ? (
                <img
                  src={project.photos[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <ImagePlus size={30} className="text-gray-300" />
                </div>
              )}

              {/* HOVER GRADIENT */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* PROJECT INFO */}

              <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block bg-[#1558cb] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1">
                  {project.category}
                </span>

                <p className="text-white font-semibold text-xs leading-tight">
                  {project.title}
                </p>

                <div className="flex items-center gap-1 text-gray-300 text-[10px] mt-0.5">
                  <MapPin size={8} />
                  {project.location}
                </div>
              </div>

              {/* ADMIN CONTROLS */}

              {isAdmin && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  {/* REPLACE PHOTO */}

                  <label
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer shadow"
                  >
                    <Pencil size={11} />
                    Replace Photos
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);

                        if (files.length > 0) {
                          replaceImage(project, files);
                        }

                        e.target.value = "";
                      }}
                    />
                  </label>

                  {/* EDIT DETAILS */}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingProject(project);
                    }}
                    className="flex items-center gap-1.5 bg-[#1558cb] hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow transition-colors"
                  >
                    <Pencil size={11} />
                    Edit Details
                  </button>

                  {/* DELETE */}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // removeProject(project);
                      setDeleteProjectId(project.id);
                    }}
                    className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow transition-colors"
                  >
                    <Trash2 size={11} />
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* ADD PROJECT */}

          {isAdmin && (
            <button
              onClick={() => setShowAddProject(true)}
              className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-[#1558cb] flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-[#1558cb] transition-colors group/add bg-white"
            >
              <ImagePlus
                size={26}
                className="group-hover/add:scale-110 transition-transform"
              />

              <span className="text-xs font-semibold">Add Project</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Project;
