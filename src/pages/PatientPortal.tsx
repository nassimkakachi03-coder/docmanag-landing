import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import {
  CalendarDays, CreditCard, ExternalLink, FileText,
  Image as ImageIcon, LogOut, Plus, ShieldCheck, UserRound, X,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const statusLabel = (s?: string) => {
  const map: Record<string, string> = { Scheduled: 'Planifié', Completed: 'Terminé', Cancelled: 'Annulé', Pending: 'En attente', Paid: 'Payée', Overdue: 'En retard' };
  return map[s || ''] || s || 'Non renseigné';
};
const timelineLabel = (t: string) => {
  const map: Record<string, string> = { appointment: 'Soin / rendez-vous', prescription: 'Ordonnance', invoice: 'Facture', payment: 'Paiement' };
  return map[t] || t;
};

export default function PatientPortal() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'timeline' | 'prescriptions' | 'billing' | 'profile'>('timeline');

  // Appointment booking
  const [showRdv, setShowRdv] = useState(false);
  const [rdvForm, setRdvForm] = useState({ date: '', reason: '', notes: '' });
  const [rdvLoading, setRdvLoading] = useState(false);
  const [rdvMsg, setRdvMsg] = useState('');
  const [rdvError, setRdvError] = useState('');

  // Medical Profile
  const [profileForm, setProfileForm] = useState({ medicalHistory: '', xRayUrl: '', prescriptionUrl: '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');

  const token = localStorage.getItem('patient_token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const load = async () => {
      if (!token) { setError('Veuillez vous connecter.'); setLoading(false); return; }
      try {
        const r = await axios.get(`${API_URL}/patient-auth/me/history`, { headers });
        setData(r.data);
        if (r.data?.patient) {
          setProfileForm({
            medicalHistory: r.data.patient.medicalHistory || '',
            xRayUrl: r.data.patient.xRayUrl || '',
            prescriptionUrl: r.data.patient.prescriptionUrl || '',
          });
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Impossible de charger votre historique.');
      } finally { setLoading(false); }
    };
    void load();
  }, []);

  const logout = () => { localStorage.removeItem('patient_token'); localStorage.removeItem('patient_user'); navigate('/'); };

  const patient = data?.patient;
  const account = data?.account;
  const prescriptions = data?.prescriptions || [];
  const invoices = data?.invoices || [];
  const careTimeline = data?.careTimeline || [];
  const stats = data?.stats || {};

  const summaryCards = useMemo(() => [
    { label: 'Soins / RDV', value: stats.appointmentCount || 0, icon: CalendarDays },
    { label: 'Ordonnances', value: stats.prescriptionCount || 0, icon: FileText },
    { label: 'Factures', value: stats.invoiceCount || 0, icon: CreditCard },
    { label: 'Total réglé', value: `${(stats.totalPaid || 0).toLocaleString('fr-DZ')} DZD`, icon: ShieldCheck },
  ], [stats]);

  const handleRdv = async (e: React.FormEvent) => {
    e.preventDefault(); setRdvLoading(true); setRdvError(''); setRdvMsg('');
    try {
      await axios.post(`${API_URL}/patient-auth/appointment`, rdvForm, { headers });
      setRdvMsg('Rendez-vous créé ! Le cabinet vous contactera pour confirmer.');
      setRdvForm({ date: '', reason: '', notes: '' });
      setTimeout(() => { setShowRdv(false); setRdvMsg(''); }, 2500);
    } catch (err: any) {
      setRdvError(err.response?.data?.message || 'Erreur lors de la création du rendez-vous.');
    } finally { setRdvLoading(false); }
  };

  const handleProfile = async (e: React.FormEvent) => {
    e.preventDefault(); setProfileLoading(true); setProfileMsg('');
    try {
      await axios.put(`${API_URL}/patient-auth/me/medical-profile`, profileForm, { headers });
      setProfileMsg('Dossier mis à jour !');
      if (data?.patient) {
        data.patient.medicalHistory = profileForm.medicalHistory;
        data.patient.xRayUrl = profileForm.xRayUrl;
        data.patient.prescriptionUrl = profileForm.prescriptionUrl;
      }
    } catch { setProfileMsg('Erreur lors de la mise à jour.'); }
    finally { setProfileLoading(false); }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'xRayUrl' | 'prescriptionUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === 'string') {
        setProfileForm((prev) => ({ ...prev, [field]: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  if (loading) return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-600 border-t-transparent" />
    </div>
  );

  if (error) return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-lg rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-xl">
        <p className="text-lg font-black text-slate-900">{error}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link to="/login" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800">Se connecter</Link>
          <Link to="/register" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200">Créer un compte</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[linear-gradient(180deg,#f8fafc_0%,#eef6f5_46%,#ffffff_100%)] py-6 sm:py-10">
      <div className="mx-auto max-w-7xl space-y-5 px-4 sm:space-y-6 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-900 p-6 text-white shadow-xl sm:rounded-[34px] sm:p-8">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,_rgba(45,212,191,0.22),_transparent_60%)]" />
          <div className="relative flex flex-col gap-4 sm:gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-teal-200">Espace patient privé</p>
              <h1 className="mt-2 text-2xl font-black tracking-tight sm:mt-3 sm:text-3xl">Bonjour {patient?.firstName} {patient?.lastName}</h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:mt-3">Retrouvez ici votre historique, vos documents et vos paiements.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setShowRdv(true)} className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal-400">
                <Plus className="h-4 w-4" /> Prendre rendez-vous
              </button>
              <button onClick={logout} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/20">
                <LogOut className="h-4 w-4" /> Déconnexion
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          {summaryCards.map(({ label, value, icon: Icon }) => (
            <article key={label} className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[28px] sm:p-5">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-teal-50 p-2.5 text-teal-700 sm:rounded-2xl sm:p-3"><Icon className="h-4 w-4 sm:h-5 sm:w-5" /></div>
                <span className="text-xl font-black text-slate-900 sm:text-2xl">{value}</span>
              </div>
              <p className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 sm:mt-4 sm:text-xs">{label}</p>
            </article>
          ))}
        </section>

        {/* RDV Modal */}
        {showRdv && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setShowRdv(false)}>
            <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl sm:p-8" onClick={(e) => e.stopPropagation()}>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900">Prendre rendez-vous</h2>
                <button onClick={() => setShowRdv(false)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X className="h-5 w-5" /></button>
              </div>
              {rdvMsg && <div className="mb-4 rounded-2xl bg-teal-50 p-3 text-sm font-bold text-teal-700">{rdvMsg}</div>}
              {rdvError && <div className="mb-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{rdvError}</div>}
              <form onSubmit={handleRdv} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Date et heure *</label>
                  <input required type="datetime-local" value={rdvForm.date} onChange={(e) => setRdvForm({ ...rdvForm, date: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Motif *</label>
                  <input required value={rdvForm.reason} onChange={(e) => setRdvForm({ ...rdvForm, reason: e.target.value })} placeholder="Ex: Contrôle, détartrage, douleur..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Notes (optionnel)</label>
                  <textarea rows={3} value={rdvForm.notes} onChange={(e) => setRdvForm({ ...rdvForm, notes: e.target.value })} placeholder="Précisions..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10" />
                </div>
                <button type="submit" disabled={rdvLoading} className="w-full rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-60">
                  {rdvLoading ? 'Envoi...' : 'Confirmer le rendez-vous'}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="grid gap-5 sm:gap-6 xl:grid-cols-[minmax(0,1.6fr)_380px]">
          {/* Main content */}
          <section className="rounded-[24px] border border-slate-200 bg-white shadow-sm sm:rounded-[30px]">
            <div className="flex flex-wrap gap-2 border-b border-slate-100 p-3 sm:p-4">
              {([
                { key: 'timeline', label: 'Historique' },
                { key: 'prescriptions', label: 'Ordonnances' },
                { key: 'billing', label: 'Factures' },
                { key: 'profile', label: 'Mon Dossier' },
              ] as const).map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`rounded-xl px-3 py-2.5 text-xs font-bold transition sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm ${activeTab === tab.key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-5">
              {activeTab === 'timeline' && (
                <div className="space-y-3">
                  {careTimeline.length === 0 ? (
                    <p className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-500">Aucun élément d'historique pour le moment.</p>
                  ) : careTimeline.map((item: any) => (
                    <article key={`${item.type}-${item.id}`} className="rounded-[20px] border border-slate-200 p-4 sm:rounded-[26px]">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-600">{timelineLabel(item.type)}</p>
                          <h2 className="mt-1.5 text-sm font-black text-slate-900 sm:mt-2 sm:text-base">{item.label}</h2>
                          {item.note && <p className="mt-1.5 text-sm text-slate-600">{item.note}</p>}
                        </div>
                        <div className="text-xs text-slate-500 sm:text-sm sm:text-right">
                          <p className="font-semibold text-slate-900">{new Date(item.date).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                          {item.status && <p className="mt-1">{statusLabel(item.status)}</p>}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {activeTab === 'prescriptions' && (
                <div className="space-y-3">
                  {prescriptions.length === 0 ? (
                    <p className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-500">Aucune ordonnance disponible.</p>
                  ) : prescriptions.map((rx: any) => (
                    <article key={rx._id} className="rounded-[20px] border border-slate-200 p-4 sm:rounded-[26px]">
                      <h2 className="text-sm font-black text-slate-900 sm:text-base">Ordonnance du {new Date(rx.date || rx.createdAt).toLocaleDateString('fr-FR')}</h2>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(rx.medications || []).map((m: any, i: number) => (
                          <div key={`${rx._id}-${i}`} className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700 sm:rounded-2xl">
                            <p className="font-bold">{m.name}</p>
                            <p className="text-xs text-slate-500">{m.dosage}{m.frequency ? ` • ${m.frequency}` : ''}{m.duration ? ` • ${m.duration}` : ''}</p>
                          </div>
                        ))}
                      </div>
                      {rx.notes && <p className="mt-3 text-sm text-slate-600">{rx.notes}</p>}
                    </article>
                  ))}
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-3">
                  {invoices.length === 0 ? (
                    <p className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-500">Aucune facture disponible.</p>
                  ) : invoices.map((inv: any) => (
                    <article key={inv._id} className="rounded-[20px] border border-slate-200 p-4 sm:rounded-[26px]">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h2 className="text-sm font-black text-slate-900 sm:text-base">{inv.items?.map((i: any) => i.description).join(', ') || 'Facture'}</h2>
                          <p className="mt-1 text-sm text-slate-600">{statusLabel(inv.status)}</p>
                        </div>
                        <div className="text-xs text-slate-500 sm:text-sm sm:text-right">
                          <p className="font-semibold text-slate-900">{new Date(inv.createdAt).toLocaleDateString('fr-FR')}</p>
                          <p className="mt-1 font-black text-slate-900">{(inv.totalAmount || 0).toLocaleString('fr-DZ')} DZD</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
              {activeTab === 'profile' && (
                <div className="space-y-5">
                  <div className="rounded-2xl bg-teal-50 p-4 sm:p-5">
                    <h2 className="text-sm font-black text-teal-900 sm:text-base">Compléter votre dossier médical</h2>
                    <p className="mt-1 text-xs text-teal-700 sm:text-sm">Ces informations aideront le praticien à mieux préparer votre rendez-vous.</p>
                  </div>
                  {profileMsg && <div className="rounded-2xl border border-teal-200 bg-teal-50 p-3 text-sm font-bold text-teal-700">{profileMsg}</div>}
                  <form onSubmit={handleProfile} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Antécédents médicaux (allergies, maladies...)</label>
                      <textarea rows={4} value={profileForm.medicalHistory} onChange={(e) => setProfileForm({ ...profileForm, medicalHistory: e.target.value })} placeholder="Aucun antécédent particulier..."
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">Photo de votre Radio (Image)</label>
                        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'xRayUrl')}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" />
                        {profileForm.xRayUrl && <p className="text-xs text-teal-600 font-bold">Image sélectionnée ✓</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">Ordonnance / Lettre (PDF)</label>
                        <input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'prescriptionUrl')}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" />
                        {profileForm.prescriptionUrl && <p className="text-xs text-teal-600 font-bold">Fichier sélectionné ✓</p>}
                      </div>
                    </div>
                    <button type="submit" disabled={profileLoading} className="w-full rounded-2xl bg-teal-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-teal-700 disabled:opacity-60">
                      {profileLoading ? 'Enregistrement...' : 'Mettre à jour mon dossier'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-4">
            <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[30px] sm:p-6">
              <div className="flex items-center gap-2"><UserRound className="h-4 w-4 text-teal-600" /><h2 className="text-base font-black text-slate-900">Mes informations</h2></div>
              <div className="mt-3 space-y-2 text-sm text-slate-600 sm:mt-4 sm:space-y-3">
                <p><span className="font-bold text-slate-900">Nom:</span> {patient?.firstName} {patient?.lastName}</p>
                <p><span className="font-bold text-slate-900">Téléphone:</span> {patient?.phone || account?.phone || 'Non renseigné'}</p>
                <p><span className="font-bold text-slate-900">Email:</span> {patient?.email || account?.email || 'Non renseigné'}</p>
                <p><span className="font-bold text-slate-900">Compte créé le:</span> {account?.createdAt ? new Date(account.createdAt).toLocaleDateString('fr-FR') : 'Non disponible'}</p>
              </div>
            </section>

            <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[30px] sm:p-6">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-teal-600" /><h2 className="text-base font-black text-slate-900">Résumé du dossier</h2></div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:mt-4">{patient?.caseSummary || patient?.medicalHistory || 'Aucune information médicale résumée.'}</p>
            </section>

            <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[30px] sm:p-6">
              <div className="flex items-center gap-2"><ImageIcon className="h-4 w-4 text-teal-600" /><h2 className="text-base font-black text-slate-900">Documents</h2></div>
              
              <div className="mt-4 space-y-4">
                {patient?.xRayUrl ? (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Radiographie</p>
                    <img src={patient.xRayUrl} alt="Radiographie" className="h-32 w-full rounded-[18px] border border-slate-200 object-cover sm:h-40 sm:rounded-[24px]" />
                    <a href={patient.xRayUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:underline">
                      Ouvrir la radio <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Aucune radiographie.</p>
                )}

                {patient?.prescriptionUrl && (
                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ordonnance patient</p>
                    <a href={patient.prescriptionUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:underline">
                      Voir le document <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
