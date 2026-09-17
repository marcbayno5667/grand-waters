import * as React from "react";
import imgE from "@/imports/e.png";
import {
  ArrowRight,
  CalendarCheck,
  Droplets,
  Pencil,
  Trash2,
} from "lucide-react";
import { API_ENDPOINT } from "../../utils/constants";
import { SectionLabel, EditableImage } from "../../utils/services";
import AddService from "./AddService.widget";

interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string | null;
  image?: string | null;
  num: string;
}

export const Service: React.FC<{isAdmin: boolean, setShowModal: (show: boolean) => void}> = (props) => {
  const { isAdmin, setShowModal } = props;
  const [services, setServices] = React.useState<Service[]>([]);
  const [activeSvc, setActiveSvc] = React.useState(-1);
  const [showAddService, setShowAddService] = React.useState(false);

  const updateService = React.useCallback(
    async (
      serviceId: number,
      field: "title" | "description",
      value: string
    ) => {
      try {
        const formData = new FormData();
        formData.append(field, value);

        const response = await fetch(
          `${API_ENDPOINT}/api/services/${serviceId}`,
          {
            method: "PATCH",
            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to update service");
        }

        setServices((prev) =>
          prev.map((service) =>
            service.id === serviceId
              ? {
                  ...service,
                  ...data.service,
                }
              : service
          )
        );

        console.log(`Service ${field} updated successfully`);
      } catch (error) {
        console.error(`Failed to update service ${field}:`, error);
        alert(`Failed to update ${field}.`);
      }
    },
    []
  );

  const replaceServiceImage = React.useCallback(
    async (serviceId: number, file: File) => {
      try {
        const formData = new FormData();

        formData.append("image", file);

        const response = await fetch(
          `${API_ENDPOINT}/api/services/${serviceId}`,
          {
            method: "PATCH",
            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to replace image");
        }

        setServices((prev) =>
          prev.map((service) =>
            service.id === serviceId
              ? {
                  ...service,
                  ...data.service,
                }
              : service
          )
        );

        console.log("Service image replaced successfully");
      } catch (error) {
        console.error("Service image replacement error:", error);
        alert("Failed to replace service image.");
      }
    },
    []
  );

  const replaceServiceIcon = async (serviceId: number, file: File) => {
    try {
      const formData = new FormData();
      formData.append("icon", file);

      const response = await fetch(
        `${API_ENDPOINT}/api/services/${serviceId}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to replace icon");
      }

      setServices((prev) =>
        prev.map((service) =>
          service.id === serviceId ? { ...service, ...data.service } : service
        )
      );
    } catch (error) {
      console.error("Error replacing service icon:", error);
      alert("Failed to replace service icon.");
    }
  };

  const removeServiceIcon = async (serviceId: number) => {
    if (!window.confirm("Remove this service icon?")) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("removeIcon", "true");

      const response = await fetch(
        `${API_ENDPOINT}/api/services/${serviceId}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to remove icon");
      }

      setServices((prev) =>
        prev.map((service) =>
          service.id === serviceId ? { ...service, ...data.service } : service
        )
      );
    } catch (error) {
      console.error("Error removing service icon:", error);
      alert("Failed to remove service icon.");
    }
  };

  const addService = async (
    title: string,
    description: string,
    image: File,
    icon?: File
  ) => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      if (icon) {
        formData.append("icon", icon);
      }

      const response = await fetch(`${API_ENDPOINT}/api/services`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to create service");
      }

      setServices((prev) => {
        const updated = [...prev, data.service];

        return updated.map((service, index) => ({
          ...service,
          num: String(index + 1).padStart(2, "0"),
        }));
      });

      alert("Service added successfully!");
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service.");
      throw error;
    }
  };

  const deleteService = async (serviceId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service? This cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/services/${serviceId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete service");
      }

      // Remove the service from the frontend
      setServices((prev) => {
        const updated = prev.filter((service) => service.id !== serviceId);

        // Re-number services
        return updated.map((service, index) => ({
          ...service,
          num: String(index + 1).padStart(2, "0"),
        }));
      });

      // Close the service if it was open
      setActiveSvc(-1);
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete service.");
    }
  };

  React.useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/api/services`);

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();

        const formattedServices: Service[] = data.services.map(
          (service: Omit<Service, "num">, index: number) => ({
            ...service,
            num: String(index + 1).padStart(2, "0"),
          })
        );

        setServices(formattedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    loadServices();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6">
      <SectionLabel text="What We Do" />
      {showAddService && (
        <AddService
          onClose={() => setShowAddService(false)}
          onAdd={addService}
        />
      )}
      <h2 className="font-black text-3xl lg:text-4xl text-gray-900 mb-10 leading-tight">
        Our Services
      </h2>

      <div className="divide-y divide-gray-100 border-t border-gray-100">
        {services.map((s, i) => {
          const open = activeSvc === i;
          const title = s.title;
          const desc = s.description;
          const imgSrc = s.image ?? imgE;

          return (
            <div key={s.id}>
              <button
                onClick={() => setActiveSvc(open ? -1 : i)}
                className="w-full text-left flex items-center gap-4 py-5 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    open ? "bg-transparent" : "bg-transparent"
                  }`}
                >
                  {s.icon ? (
                    <img
                      src={s.icon}
                      alt=""
                      className="w-6 h-6 object-contain"
                    />
                  ) : (
                    <span className="text-[#1558cb]">
                      <Droplets size={20} />
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black ${
                        open ? "text-[#1558cb]" : "text-gray-300"
                      }`}
                    >
                      {s.num}
                    </span>
                    <span
                      className={`font-bold text-base ${
                        open
                          ? "text-[#1558cb]"
                          : "text-gray-800 group-hover:text-gray-900"
                      }`}
                    >
                      {title}
                    </span>
                  </div>
                </div>
                <div
                  className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    open
                      ? "border-[#1558cb] bg-[#1558cb] rotate-90"
                      : "border-gray-200 group-hover:border-[#1558cb]"
                  }`}
                >
                  <ArrowRight
                    size={13}
                    className={
                      open
                        ? "text-white"
                        : "text-gray-400 group-hover:text-[#1558cb]"
                    }
                  />
                </div>
              </button>

              {open && (
                <div className="flex flex-col sm:flex-row gap-5 pb-7 pl-16">
                  {/* IMAGE */}
                  <div
                    className="sm:w-52 shrink-0 rounded-xl overflow-hidden"
                    style={{ height: "140px" }}
                  >
                    <EditableImage
                      id={`svc-${i}`}
                      src={imgSrc}
                      alt={title}
                      className="w-full h-full object-cover"
                      wrapperClassName="relative group/ei w-full h-full"
                      isAdmin={isAdmin}
                      store={{}}
                      onReplace={(id, file) => replaceServiceImage(s.id, file)}
                    />
                  </div>

                  {/* TITLE + DESCRIPTION + SERVICE ICON */}
                  <div className="flex-1 min-w-0">
                    {/* YOUR EXISTING TITLE/DESCRIPTION CODE */}
                    {isAdmin ? (
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[10px] font-bold text-[#1558cb] uppercase tracking-widest mb-1">
                            Service Title
                          </label>

                          <input
                            defaultValue={s.title}
                            key={`${s.id}-title-${s.title}`}
                            onBlur={(e) =>
                              updateService(
                                s.id,
                                "title",
                                e.currentTarget.value
                              )
                            }
                            className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#1558cb] uppercase tracking-widest mb-1">
                            Description
                          </label>

                          <textarea
                            defaultValue={s.description}
                            key={`${s.id}-description-${s.description}`}
                            onBlur={(e) =>
                              updateService(
                                s.id,
                                "description",
                                e.currentTarget.value
                              )
                            }
                            rows={4}
                            className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm text-gray-600 leading-relaxed focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition resize-none"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {desc}
                        </p>

                        <button
                          onClick={() => setShowModal(true)}
                          className="mt-4 inline-flex items-center gap-2 text-[#1558cb] font-semibold text-sm hover:underline"
                        >
                          <CalendarCheck size={14} />
                          Book this service
                        </button>
                      </>
                    )}

                    {/* SERVICE ICON — KEEP IT HERE */}
                    {isAdmin && (
                      <div className="mt-2 border-t border-gray-100">
                        <label className="block text-[10px] font-bold text-[#1558cb] uppercase tracking-widest mb-2">
                          Service Icon
                        </label>

                        <div className="flex items-center gap-2 flex-wrap">
                          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-[#1558cb] text-xs font-bold cursor-pointer hover:bg-blue-100 transition">
                            <Pencil size={13} />
                            Replace Icon
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (file) {
                                  replaceServiceIcon(s.id, file);
                                }

                                e.currentTarget.value = "";
                              }}
                            />
                          </label>

                          {s.icon && (
                            <button
                              type="button"
                              onClick={() => removeServiceIcon(s.id)}
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 text-gray-600 text-xs font-bold hover:bg-gray-100 transition"
                            >
                              <Trash2 size={13} />
                              Remove Icon
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* THIRD COLUMN — DELETE ONLY */}
                  {isAdmin && (
                    <div className="sm:w-36 shrink-0 flex items-start justify-end">
                      <button
                        type="button"
                        onClick={() => deleteService(s.id)}
                        className="inline-flex items-center gap-2 px-2 py-2 rounded-lg bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition"
                      >
                        <Trash2 size={13} />
                        Delete Service
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isAdmin && (
        <div className="pt-6">
          <button
            type="button"
            onClick={() => setShowAddService(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1558cb] text-white text-sm font-bold hover:bg-[#1049aa] transition"
          >
            <span className="text-lg leading-none">+</span>
            Add New Service
          </button>
        </div>
      )}
    </div>
  );
};

export default Service;
