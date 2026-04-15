import { useState } from "react";
import axios from "axios";
import { CheckCircle2, User, Phone, Calendar } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API_URL}/patients/register`, formData);
      setSuccess(true);
      setFormData({ firstName: "", lastName: "", phone: "", dateOfBirth: "" });
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-teal-50 to-white" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-6">
              Votre Sourire, Notre <span className="text-teal-600">Priorité</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Le cabinet dentaire du Dr Kakachi vous accueille dans un cadre moderne et rassurant. 
              Une équipe de professionnels dévoués à votre santé bucco-dentaire avec des soins de pointe à des prix accessibles.
            </p>
          </div>

          <div className="mt-16 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">
            <div className="bg-teal-600 p-10 md:w-2/5 flex flex-col justify-center text-white">
              <h2 className="text-3xl font-bold mb-4">Prenez Rendez-vous</h2>
              <p className="text-teal-50 mb-8 leading-relaxed">
                Créez votre dossier patient en quelques clics. Notre équipe vous contactera rapidement pour fixer une date de consultation.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">Soins de qualité</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">Prix abordables</span>
                </div>
              </div>
            </div>

            <div className="p-10 md:w-3/5">
              {success ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                  <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Demande envoyée !</h3>
                  <p className="text-slate-600">
                    Votre dossier a été pré-créé avec succès. Notre équipe vous rappellera très vite.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-xl transition-colors"
                  >
                    Faire une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Prénom</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          required
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                          placeholder="Ex: Yacine"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Nom</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          required
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                          placeholder="Ex: Benali"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Téléphone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                        placeholder="0550 00 00 00"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Date de naissance</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        required
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium text-slate-700"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center mt-4"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Soumettre mon dossier"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
