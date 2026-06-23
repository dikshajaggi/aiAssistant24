import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loader2, User, Building2, Upload, ImagePlus } from "lucide-react";
import { useClinicProfile } from "../hooks/useQueries";
import { updateClinicProfile } from "../apis";
import PageWrapper from "./PageWrapper";
import DashboardLayoutSettings from "../components/DashboardLayoutSettings";

const INITIAL = {
  doctor_name: "",
  specialization: "",
  registration_number: "",
  clinic_name: "",
  address: "",
  city: "",
  phone: "",
  email: "",
  website: "",
  logo_url: "",
};

const inputCls =
  "w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary1 bg-white";

// Field accepts an optional className so parent grid can apply col-span
const Field = ({ label, className = "", children }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
  </div>
);

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-4">
    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary1/10">
      <Icon size={16} className="text-secondary1" />
    </div>
    <h2 className="font-semibold text-gray-800 text-base">{title}</h2>
  </div>
);

const Profile = () => {
  const queryClient = useQueryClient();
  const { data: clinicProfile, isLoading: fetching } = useClinicProfile();
  const [form, setForm] = useState(INITIAL);
  const [saving, setSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState("");

  useEffect(() => {
    if (!clinicProfile) return;
    const merged = { ...INITIAL, ...clinicProfile };
    setForm(merged);
    if (merged.logo_url) setLogoPreview(merged.logo_url);
  }, [clinicProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "logo_url") setLogoPreview(value);
  };

  const handleLogoFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo must be under 2 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setLogoPreview(dataUrl);
      setForm((prev) => ({ ...prev, logo_url: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateClinicProfile(form);
      queryClient.invalidateQueries({ queryKey: ["clinicProfile"] });
      toast.success("Profile saved successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (fetching) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center py-24 text-gray-400 gap-2 text-sm">
          <Loader2 size={20} className="animate-spin" /> Loading profile…
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-0 pt-4 pb-16">

        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-400 mt-1">
            Details here appear on your prescription letterheads.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-5">

          {/* ── Doctor Details ── */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <SectionHeader icon={User} title="Doctor Details" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name">
                <input
                  name="doctor_name"
                  value={form.doctor_name}
                  onChange={handleChange}
                  placeholder="Dr. Jane Smith"
                  className={inputCls}
                />
              </Field>
              <Field label="Specialization">
                <input
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  placeholder="BDS, MDS – Orthodontics"
                  className={inputCls}
                />
              </Field>
              <Field label="Registration Number" className="sm:col-span-2">
                <input
                  name="registration_number"
                  value={form.registration_number}
                  onChange={handleChange}
                  placeholder="MCI / State reg. no."
                  className={inputCls}
                />
              </Field>
            </div>
          </section>

          {/* ── Clinic Details ── */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <SectionHeader icon={Building2} title="Clinic Details" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Clinic Name">
                <input
                  name="clinic_name"
                  value={form.clinic_name}
                  onChange={handleChange}
                  placeholder="SmileCare Dental Clinic"
                  className={inputCls}
                />
              </Field>
              <Field label="City">
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Mumbai"
                  className={inputCls}
                />
              </Field>
              {/* Address spans full width on sm+ */}
              <Field label="Address" className="sm:col-span-2">
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123, MG Road, Andheri West"
                  className={inputCls}
                />
              </Field>
              <Field label="Phone">
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={inputCls}
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="clinic@example.com"
                  className={inputCls}
                />
              </Field>
              <Field label="Website" className="sm:col-span-2">
                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://yourclinic.com"
                  className={inputCls}
                />
              </Field>
            </div>
          </section>

          {/* ── Letterhead Logo ── */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <SectionHeader icon={ImagePlus} title="Letterhead Logo" />
            <p className="text-xs text-gray-400 mb-4">
              PNG, JPG or WebP · max 2 MB · appears on prescription letterheads
            </p>

            {/* Stack on mobile, side-by-side on sm+ */}
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">

              {/* Preview box — full-width on mobile, fixed on sm+ */}
              <div className="w-full sm:w-32 sm:shrink-0 h-32 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-full h-full object-contain p-2"
                    onError={() => setLogoPreview("")}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-gray-300">
                    <ImagePlus size={28} />
                    <span className="text-xs">No logo</span>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex-1 w-full space-y-4">
                <Field label="Upload from device">
                  <label className="inline-flex items-center gap-2 cursor-pointer border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition">
                    <Upload size={14} />
                    Choose file
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={handleLogoFile}
                    />
                  </label>
                </Field>

                <Field label="Or paste an image URL">
                  <input
                    name="logo_url"
                    value={form.logo_url?.startsWith("data:") ? "" : form.logo_url}
                    onChange={handleChange}
                    placeholder="https://example.com/logo.png"
                    className={inputCls}
                  />
                </Field>

                {logoPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoPreview("");
                      setForm((p) => ({ ...p, logo_url: "" }));
                    }}
                    className="text-xs text-red-500 hover:underline cursor-pointer"
                  >
                    Remove logo
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* ── Dashboard Layout ── */}
          <DashboardLayoutSettings />

          {/* ── Save ── */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-secondary1 text-white px-8 py-2.5 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {saving ? (
                <><Loader2 size={15} className="animate-spin" /> Saving…</>
              ) : (
                "Save Profile"
              )}
            </button>
          </div>

        </form>
      </div>
    </PageWrapper>
  );
};

export default Profile;
