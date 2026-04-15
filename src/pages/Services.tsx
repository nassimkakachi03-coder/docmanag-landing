import { Stethoscope, Activity, Heart, ShieldCheck, Microscope, Zap, CheckCircle2, Cpu, Waves, TrendingUp, Users, Award, Star } from "lucide-react";
import surgerySrc from "../assets/surgery.png";
import orthoSrc from "../assets/ortho.png";
import generalSrc from "../assets/general.png";

export default function Services() {
  const specializedServices = [
    {
      title: "Chirurgie Bucco-Dentaire",
      description: "Interventions expertes pour les cas complexes : extractions de dents de sagesse incluses, chirurgie pré-prothétique et reconstructions osseuses.",
      features: ["Extractions complexes", "Chirurgie gingivale", "Traitement des kystes", "Implantologie avancée"],
      icon: <Microscope className="w-8 h-8" />,
      color: "border-red-100 bg-red-50 text-red-600",
      image: surgerySrc
    },
    {
      title: "Chirurgie Orthodontique",
      description: "Correction des malformations des mâchoires en collaboration étroite avec les orthodontistes pour un alignement fonctionnel et esthétique parfait.",
      features: ["Ostéotomies maxillaires", "Correction du prognathisme", "Chirurgie ortho-faciale", "Expansion palatine"],
      icon: <Zap className="w-8 h-8" />,
      color: "border-amber-100 bg-amber-50 text-amber-600",
      image: orthoSrc
    },
    {
      title: "Soins Dentaires Généraux",
      description: "Traitement complet des caries, dévitalisations et soins conservateurs pour maintenir une santé bucco-dentaire optimale au quotidien.",
      features: ["Détartrage & Polissage", "Traitement des caries", "Endodontie", "Prévention & Bilan"],
      icon: <Stethoscope className="w-8 h-8" />,
      color: "border-teal-100 bg-teal-50 text-teal-600",
      image: generalSrc
    },
  ];

  const outcomes = [
    {
      icon: <Users className="w-8 h-8 text-teal-500" />,
      stat: "+1 200",
      label: "Patients Traités",
      description: "Une patientèle fidèle et satisfaite depuis l'ouverture du cabinet.",
      accent: "bg-teal-50 border-teal-100",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-amber-500" />,
      stat: "98%",
      label: "Taux de Satisfaction",
      description: "Nos patients recommandent le cabinet à leur entourage.",
      accent: "bg-amber-50 border-amber-100",
    },
    {
      icon: <Award className="w-8 h-8 text-red-500" />,
      stat: "15+",
      label: "Années d'Expérience",
      description: "Une expertise chirurgicale reconnue et constamment mise à jour.",
      accent: "bg-red-50 border-red-100",
    },
    {
      icon: <Star className="w-8 h-8 text-purple-500" />,
      stat: "4.9/5",
      label: "Note Moyenne",
      description: "Évaluations authentiques de nos patients sur chaque prestation.",
      accent: "bg-purple-50 border-purple-100",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="bg-slate-900 py-32 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tight leading-tight">Expertise & <span className="text-teal-400">Haute Technologie</span></h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Le cabinet du Dr Kakachi combine savoir-faire chirurgical et équipements de pointe pour une excellence dentaire sans compromis.
          </p>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="py-32 max-w-7xl mx-auto px-6 border-b border-slate-50">
        <div className="text-center mb-24">
          <h2 className="text-sm font-black text-teal-600 uppercase tracking-[0.3em] mb-4">Nos Spécialités</h2>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">Une approche clinique d'élite</h3>
          <div className="w-24 h-1.5 bg-teal-500 mx-auto mt-8 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {specializedServices.map((service, index) => (
            <div key={index} className="group relative flex flex-col rounded-[40px] border border-slate-100 bg-white overflow-hidden hover:border-teal-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
              <div className="h-56 overflow-hidden relative">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className={`absolute top-6 left-6 p-4 rounded-2xl border backdrop-blur-md transition-transform duration-700 ${service.color}`}>
                  {service.icon}
                </div>
              </div>
              <div className="p-10 flex-1">
                <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">{service.title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                  {service.description}
                </p>
                <div className="space-y-4">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-4 text-sm font-bold text-slate-700">
                      <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Results Section — Stats */}
      <section className="py-32 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-sm font-black text-teal-600 uppercase tracking-[0.3em] mb-4">Nos Résultats</h2>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">Un bilan qui parle de lui-même</h3>
            <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              Des années d'expertise au service d'une patientèle exigeante. Nos chiffres reflètent l'engagement du Dr Kakachi envers l'excellence.
            </p>
            <div className="w-24 h-1.5 bg-teal-500 mx-auto mt-8 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {outcomes.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center text-center p-10 rounded-[40px] border ${item.accent} group hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-500`}
              >
                <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <span className="text-5xl font-black text-slate-900 mb-2 tracking-tight">{item.stat}</span>
                <span className="text-sm font-black text-slate-700 uppercase tracking-widest mb-4">{item.label}</span>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Decorative quote */}
          <div className="mt-20 bg-slate-900 rounded-[40px] p-12 text-center text-white">
            <ShieldCheck className="w-10 h-10 text-teal-400 mx-auto mb-6" />
            <p className="text-2xl font-black italic tracking-tight max-w-3xl mx-auto leading-snug">
              "Notre priorité absolue est votre sourire et votre bien-être. Chaque traitement est pensé avec précision et humanité."
            </p>
            <span className="mt-6 inline-block text-teal-400 font-bold text-sm uppercase tracking-widest">— Dr Kakachi, Chirurgien-Dentiste</span>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-teal-600 uppercase tracking-[0.3em] mb-4">Avis Patients</h2>
            <h3 className="text-3xl font-black text-slate-900 mb-4">Ce que disent nos patients</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">La satisfaction de nos patients est notre plus belle réussite. Découvrez leurs retours d'expérience sur notre prise en charge et le professionnalisme de notre équipe.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="flex text-yellow-400 mb-4 cursor-default">
                {"★★★★★"}
              </div>
              <p className="text-slate-600 italic mb-6 font-medium">
                "Excellent accueil, l'équipe est très professionnelle. Les prix sont franchement abordables comparés à d'autres, et la qualité des soins est irréprochable. Je recommande vivement le cabinet à mes proches."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center font-bold text-xl">
                  K
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Karim B.</h4>
                  <p className="text-sm text-slate-500">Patient depuis 2 ans</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="flex text-yellow-400 mb-4 cursor-default">
                {"★★★★★"}
              </div>
              <p className="text-slate-600 italic mb-6 font-medium">
                "J'avais très peur du dentiste, mais le Dr Kakachi a su me mettre à l'aise direct. La prise de rendez-vous est rapide et tout est très propre et rassurant. Niveau tarif, c'est super correct."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center font-bold text-xl">
                  A
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Amira S.</h4>
                  <p className="text-sm text-slate-500">Première consultation</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="flex text-yellow-400 mb-4 cursor-default">
                {"★★★★★"}
              </div>
              <p className="text-slate-600 italic mb-6 font-medium">
                "Travail impeccable ! J'ai fait une pose de couronne et le résultat est magnifique. Le professionnalisme de l'équipe et les prix compétitifs font de cette clinique mon seul choix. Merci à tous."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-bold text-xl">
                  Y
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Yacine D.</h4>
                  <p className="text-sm text-slate-500">Patient régulier</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment & Quality Section - Simplified */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight uppercase">Équipement de Pointe</h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-10">
                Nous investissons continuellement dans les dernières technologies médicales pour assurer une précision diagnostique et un confort opératoire optimal.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-8 rounded-[30px] bg-slate-50 border border-slate-100 hover:shadow-lg hover:border-teal-100 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-white border shadow-sm flex items-center justify-center mb-6">
                    <Cpu className="w-7 h-7 text-teal-600" />
                  </div>
                  <h4 className="font-black text-slate-900 mb-3 text-lg">Scanner 3D (CBCT)</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">Imagerie haute résolution pour une planification chirurgicale millimétrée.</p>
                </div>
                <div className="p-8 rounded-[30px] bg-slate-50 border border-slate-100 hover:shadow-lg hover:border-teal-100 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-white border shadow-sm flex items-center justify-center mb-6">
                    <Waves className="w-7 h-7 text-teal-600" />
                  </div>
                  <h4 className="font-black text-slate-900 mb-3 text-lg">Laser Dentaire</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">Traitements mini-invasifs pour une cicatrisation accélérée et sans douleur.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[40px] p-12 text-white shadow-2xl">
              <h2 className="text-3xl font-black mb-10 tracking-tight uppercase">Qualité & Sécurité</h2>
              <ul className="space-y-8">
                <li className="flex gap-5">
                  <div className="p-3 bg-teal-500/20 rounded-xl h-fit border border-teal-500/20">
                    <ShieldCheck className="w-6 h-6 text-teal-400 flex-shrink-0" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xl mb-2">Stérilisation Norme CE</h5>
                    <p className="text-slate-400 text-sm leading-relaxed">Protocoles de décontamination rigoureux et traçabilité complète de l'instrumentation.</p>
                  </div>
                </li>
                <li className="flex gap-5">
                  <div className="p-3 bg-teal-500/20 rounded-xl h-fit border border-teal-500/20">
                    <Activity className="w-6 h-6 text-teal-400 flex-shrink-0" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xl mb-2">Expertise Clinique</h5>
                    <p className="text-slate-400 text-sm leading-relaxed">Une formation continue sur les nouvelles techniques de chirurgie bucco-dentaire mondiale.</p>
                  </div>
                </li>
                <li className="flex gap-5">
                  <div className="p-3 bg-teal-500/20 rounded-xl h-fit border border-teal-500/20">
                    <Heart className="w-6 h-6 text-teal-400 flex-shrink-0" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xl mb-2">Accompagnement Patient</h5>
                    <p className="text-slate-400 text-sm leading-relaxed">Une prise en charge personnalisée pour une expérience sereine et rassurante.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
