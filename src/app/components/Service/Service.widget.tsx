import * as React from "react";
import imgE from "@/imports/e.png";
import {
  ArrowRight,
  CalendarCheck,
  Droplets,
  Pencil,
  Trash2,
} from "lucide-react";
import { API_ENDPOINT, API_HEADER } from "../../utils/constants";
import { SectionLabel, EditableImage } from "../../utils/services";
import { SnackbarProps } from "../Snackbar/Snackbar";
import Snackbar from "../Snackbar/Snackbar.widget";
import { ServiceData } from "./Service";
import AddService from "./AddService.widget";

export const Service: React.FC<{
  isAdmin: boolean;
  setShowModal: (show: boolean) => void;
  extractServices: (data: ServiceData[]) => void;
}> = (props) => {
  const { isAdmin, setShowModal, extractServices } = props;
  const [services, setServices] = React.useState<ServiceData[]>([]);
  const [activeSvc, setActiveSvc] = React.useState(-1);
  const [showAddService, setShowAddService] = React.useState(false);
  const [deleteServiceId, setDeleteServiceId] = React.useState<number | null>(
    null
  );
  const [deleteServiceIcon, setDeleteServiceIcon] = React.useState<
    number | null
  >(null);
  const [snackbar, setSnackbar] = React.useState<SnackbarProps>({
    open: false,
    type: "success",
    message: "",
  });

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
            headers: API_HEADER(),
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
        setSnackbar({
          open: true,
          type: "success",
          message: "Service updated successfully.",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          type: "error",
          message: `Failed to update ${field}.`,
        });
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
            headers: API_HEADER(),
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

        setSnackbar({
          open: true,
          type: "success",
          message: "Service image replaced successfully,",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          type: "error",
          message: "Failed to replace service image.",
        });
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
          headers: API_HEADER(),
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
      setSnackbar({
        open: true,
        type: "error",
        message: "Failed to replace service icon.",
      });
    }
  };

  const removeServiceIcon = async (serviceId: number) => {
    try {
      const formData = new FormData();
      formData.append("removeIcon", "true");

      const response = await fetch(
        `${API_ENDPOINT}/api/services/${serviceId}`,
        {
          method: "PATCH",
          headers: API_HEADER(),
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
      setSnackbar({
        open: true,
        type: "success",
        message: "Successfully removed icon.",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Failed to remove service icon.",
      });
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
        headers: API_HEADER(),
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

      setSnackbar({
        open: true,
        type: "success",
        message: "Service added successfully.",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Failed to add service.",
      });
      throw error;
    }
  };

  const deleteService = async (serviceId: number) => {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/services/${serviceId}`,
        {
          method: "DELETE",
          headers: API_HEADER(),
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
      setSnackbar({
        open: true,
        type: "success",
        message: "Service deleted successfully.",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Failed to delete service.",
      });
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

        setServices(data.services);
        extractServices(data.services);
      } catch (error) {}
    };

    loadServices();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6">
      <SectionLabel text="What We Do" />
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
        open={deleteServiceId !== null}
        type="warning"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (deleteServiceId !== null) {
            deleteService(deleteServiceId);
          }
          setDeleteServiceId(null);
        }}
        onCancel={() => {
          setDeleteServiceId(null);
        }}
        onClose={() => {
          setDeleteServiceId(null);
        }}
      />
      <Snackbar
        open={deleteServiceIcon !== null}
        type="warning"
        message="Are you sure you want to remove this icon? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (deleteServiceIcon !== null) {
            removeServiceIcon(deleteServiceIcon);
          }
          setDeleteServiceIcon(null);
        }}
        onCancel={() => {
          setDeleteServiceIcon(null);
        }}
        onClose={() => {
          setDeleteServiceIcon(null);
        }}
      />
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
                <div className="flex flex-col sm:flex-row gap-5 pb-7 pl-0 sm:pl-16">
                  {/* IMAGE */}
                  <div
                    className="w-full sm:w-52 shrink-0 rounded-xl overflow-hidden"
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

                    {/* ADMIN CONTROLS */}
                    {isAdmin && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <label className="block text-[10px] font-bold text-[#1558cb] uppercase tracking-widest mb-2">
                          Service Icon
                        </label>

                        <div className="flex flex-wrap items-center gap-2">
                          {/* REPLACE ICON */}
                          <label className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-[#1558cb] text-xs font-bold cursor-pointer hover:bg-blue-100 transition">
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

                          {/* REMOVE ICON */}
                          {s.icon && (
                            <button
                              type="button"
                              onClick={() => setDeleteServiceIcon(s.id)}
                              className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-50 text-gray-600 text-xs font-bold hover:bg-gray-100 transition"
                            >
                              <Trash2 size={13} />
                              Remove Icon
                            </button>
                          )}

                          {/* DELETE SERVICE */}
                          <button
                            type="button"
                            onClick={() => setDeleteServiceId(s.id)}
                            className="
                              w-full sm:w-auto
                              sm:ml-auto
                              inline-flex items-center justify-center gap-2
                              px-3 py-2
                              rounded-lg
                              bg-red-50 text-red-600
                              text-xs font-bold
                              hover:bg-red-100
                              transition
                            "
                          >
                            <Trash2 size={13} />
                            Delete Service
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
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
