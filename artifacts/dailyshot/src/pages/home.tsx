import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Coffee, Utensils, Users, Instagram, Facebook, MapPin, Phone, Clock, Music } from "lucide-react";
import heroImg from "@/assets/hero.png";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/gallery-5.png";
import gallery6 from "@/assets/gallery-6.png";

const formSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  telefono: z.string().regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos exactos"),
  fecha: z.string().refine((val) => {
    const date = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }, "La fecha no puede ser en el pasado"),
  hora: z.string().min(1, "Selecciona una hora"),
  personas: z.string().min(1, "Selecciona el número de personas"),
  notas: z.string().optional(),
});

function generateTimeOptions() {
  const times = [];
  for (let i = 8; i <= 20; i++) {
    times.push(`${i.toString().padStart(2, '0')}:00`);
    if (i < 20 || (i === 20 && false)) { // Until 20:30
      times.push(`${i.toString().padStart(2, '0')}:30`);
    }
  }
  return times;
}

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      fecha: "",
      hora: "",
      personas: "2",
      notas: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans text-ink bg-bg-base">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-bg-base/90 backdrop-blur-sm border-b border-line z-50 flex items-center px-6 md:px-12">
        <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
          <div className="font-serif font-semibold text-2xl tracking-tight text-accent cursor-pointer" onClick={() => scrollTo('inicio')}>
            DailyShot
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink">
            <a href="#inicio" className="hover:text-accent transition-colors">Inicio</a>
            <a href="#menu" className="hover:text-accent transition-colors">Menú</a>
            <a href="#ubicacion" className="hover:text-accent transition-colors">Ubicación</a>
            <a href="#galeria" className="hover:text-accent transition-colors">Galería</a>
            <a href="#contacto" className="hover:text-accent transition-colors">Contacto</a>
          </nav>
          <Button onClick={() => scrollTo('contacto')} className="rounded-full bg-accent hover:bg-accent/90 text-white shadow-none">
            Reservar
          </Button>
        </div>
      </header>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section id="inicio" className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start space-y-6">
            <h1 className="font-serif text-5xl md:text-7xl leading-tight text-ink">
              El Cafecito Platicador
            </h1>
            <p className="text-lg md:text-xl text-muted-text max-w-md leading-relaxed">
              Cafetería de especialidad y brunch todo el día en Guadalajara
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button onClick={() => scrollTo('menu')} variant="outline" className="rounded-full border-line hover:bg-accent-soft hover:text-ink shadow-none">
                Ver menú
              </Button>
              <Button onClick={() => scrollTo('contacto')} className="rounded-full bg-accent hover:bg-accent/90 text-white shadow-none">
                Reservar mesa
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] md:aspect-square w-full rounded-2xl overflow-hidden">
            <img src={heroImg} alt="Cappuccino y brunch" className="object-cover w-full h-full" />
          </div>
        </section>

        {/* Sobre Nosotros */}
        <section className="py-20 md:py-32 bg-accent-soft/30">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center space-y-16">
            <p className="font-serif text-2xl md:text-4xl leading-relaxed text-ink">
              "Creado para los buenos amigos. En DailyShot celebramos el ritual del café y las conversaciones largas. Un espacio donde cada taza es un pretexto para quedarse un rato más."
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent-soft flex items-center justify-center text-accent">
                  <Coffee size={28} />
                </div>
                <h3 className="font-serif text-xl">Café de especialidad</h3>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent-soft flex items-center justify-center text-accent">
                  <Utensils size={28} />
                </div>
                <h3 className="font-serif text-xl">Brunch todo el día</h3>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent-soft flex items-center justify-center text-accent">
                  <Users size={28} />
                </div>
                <h3 className="font-serif text-xl">Ambiente acogedor</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Menú */}
        <section id="menu" className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-ink">Menú</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            {/* Bebidas */}
            <div className="space-y-10">
              <h3 className="font-serif text-3xl text-accent border-b border-line pb-4">Bebidas</h3>
              <div className="space-y-8">
                {[
                  { name: "Long Black / Americano", desc: "Doble shot de espresso sobre agua caliente.", price: "45" },
                  { name: "Cappuccino Caramelo", desc: "Espresso, leche texturizada y caramelo artesanal.", price: "75" },
                  { name: "Latte", desc: "Doble ristretto con leche sedosa.", price: "65" },
                  { name: "Chai con shot de espresso", desc: "Mezcla de especias y té negro con un toque de café.", price: "85" },
                  { name: "Matcha Latte natural", desc: "Té verde ceremonial japonés con leche.", price: "80" },
                  { name: "Malteada de café con galleta", desc: "Helado de vainilla, espresso y galleta crujiente.", price: "110" },
                  { name: "Pumpkin Spice Latte (temporada)", desc: "Dulce calabaza con especias de otoño.", price: "90" },
                  { name: "Infusión frutal (fresa-kiwi)", desc: "Refrescante mezcla de frutas sin cafeína.", price: "55" },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between items-start gap-4 group">
                    <div className="space-y-1">
                      <h4 className="font-medium text-lg text-ink group-hover:text-accent transition-colors">{item.name}</h4>
                      <p className="text-sm text-muted-text">{item.desc}</p>
                    </div>
                    <span className="font-medium text-ink">${item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comida */}
            <div className="space-y-10">
              <h3 className="font-serif text-3xl text-accent border-b border-line pb-4">Comida</h3>
              <div className="space-y-8">
                {[
                  { name: "Chilaquiles de la casa", desc: "Salsa roja tatemada, crema, queso, cebolla y huevo estrellado.", price: "140" },
                  { name: "Waffles Xoco-Fresa", desc: "Masa madre, fresas frescas y crema de chocolate avellana.", price: "155" },
                  { name: "Pan Francés con gelato artesanal", desc: "Brioche dorado en mantequilla con una bola de vainilla.", price: "165" },
                  { name: "Sándwich de Masa Madre", desc: "Jamón ahumado, huevo estrellado, aguacate y aderezo chipotle.", price: "180" },
                  { name: "Sándwich de Tocino con alioli de chipotle", desc: "Tocino crujiente, lechuga y tomate en pan rústico.", price: "170" },
                  { name: "Burrito Percherón", desc: "Tortilla sobaquera, frijoles, queso, aguacate y huevo revuelto.", price: "135" },
                  { name: "Sándwich Napolitano", desc: "Queso mozzarella, tomate, albahaca y pesto en focaccia.", price: "150" },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between items-start gap-4 group">
                    <div className="space-y-1">
                      <h4 className="font-medium text-lg text-ink group-hover:text-accent transition-colors">{item.name}</h4>
                      <p className="text-sm text-muted-text">{item.desc}</p>
                    </div>
                    <span className="font-medium text-ink">${item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ubicación */}
        <section id="ubicacion" className="py-20 md:py-32 bg-ink text-bg-base">
          <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="space-y-10">
              <h2 className="font-serif text-4xl md:text-5xl text-accent-soft">Encuéntranos</h2>
              <div className="space-y-6 text-line/80">
                <div className="flex gap-4">
                  <MapPin className="text-accent shrink-0 mt-1" />
                  <p className="leading-relaxed">
                    Av. Circunvalación Agustín Yáñez 2578,<br />
                    Arcos Vallarta, 44130<br />
                    Guadalajara, Jal.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Clock className="text-accent shrink-0 mt-1" />
                  <p className="leading-relaxed">
                    Lun–Vie 7:30 am – 9 pm<br />
                    Sáb 9 am – 9 pm<br />
                    Cerrado domingos
                  </p>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-accent shrink-0 mt-1" />
                  <p>+52 33 1522 1975</p>
                </div>
              </div>
              
              <div className="pt-8 border-t border-line/20">
                <p className="text-sm uppercase tracking-wider text-accent-soft mb-4">Pide a domicilio:</p>
                <div className="flex gap-4">
                  <a href="#" className="px-6 py-3 rounded-full border border-line/30 hover:bg-line/10 transition-colors text-sm font-medium">Uber Eats</a>
                  <a href="#" className="px-6 py-3 rounded-full border border-line/30 hover:bg-line/10 transition-colors text-sm font-medium">Rappi</a>
                </div>
              </div>
            </div>
            
            <div className="w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-line/10">
              <iframe 
                src="https://www.google.com/maps?q=Av.+Circunvalaci%C3%B3n+Agust%C3%ADn+Y%C3%A1%C3%B1ez+2578,+Arcos+Vallarta,+44130+Guadalajara,+Jal.&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-90 contrast-125 mix-blend-luminosity"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Galería */}
        <section id="galeria" className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-ink">Galería</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[gallery1, gallery2, gallery3, gallery4, gallery5, gallery6].map((src, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
                <img 
                  src={src} 
                  alt={`Galería ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Contacto / Reservaciones */}
        <section id="contacto" className="py-20 md:py-32 bg-accent-soft/30 px-6 md:px-12">
          <div className="max-w-xl mx-auto bg-bg-base p-8 md:p-12 rounded-2xl border border-line shadow-sm">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-2">Reserva tu mesa</h2>
              <p className="text-muted-text">Asegura tu lugar en El Cafecito Platicador</p>
            </div>

            {isSuccess ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-ink">¡Tu reserva fue recibida!</h3>
                <p className="text-muted-text">Te contactaremos al 5660589981 para confirmar.</p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-ink">Nombre completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre" {...field} className="bg-transparent border-line focus-visible:ring-accent" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ink">Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="correo@ejemplo.com" {...field} className="bg-transparent border-line focus-visible:ring-accent" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telefono"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ink">Teléfono (10 dígitos)</FormLabel>
                          <FormControl>
                            <Input placeholder="3312345678" maxLength={10} {...field} className="bg-transparent border-line focus-visible:ring-accent" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="fecha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ink">Fecha</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} className="bg-transparent border-line focus-visible:ring-accent" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="hora"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ink">Hora</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-transparent border-line focus-visible:ring-accent">
                                <SelectValue placeholder="Selecciona" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {generateTimeOptions().map((time) => (
                                <SelectItem key={time} value={time}>{time}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="personas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ink">Personas</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-transparent border-line focus-visible:ring-accent">
                                <SelectValue placeholder="Cantidad" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'persona' : 'personas'}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-ink">Notas adicionales (opcional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="¿Alguna celebración especial o alergia?" 
                            className="resize-none bg-transparent border-line focus-visible:ring-accent" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full rounded-full bg-accent hover:bg-accent/90 text-white shadow-none h-12 text-lg mt-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Confirmar reserva"}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-bg-base border-t border-line py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 mb-12">
          {/* Col 1 */}
          <div className="space-y-6">
            <div className="font-serif font-semibold text-2xl tracking-tight text-accent">
              DailyShot
            </div>
            <div className="flex gap-4">
              <a href="https://instagram.com/dailyshotmx" target="_blank" rel="noopener noreferrer" className="text-muted-text hover:text-accent transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com/dailyshotmx" target="_blank" rel="noopener noreferrer" className="text-muted-text hover:text-accent transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://tiktok.com/@dailyshotmx" target="_blank" rel="noopener noreferrer" className="text-muted-text hover:text-accent transition-colors">
                <Music size={24} /> {/* Fallback for TikTok */}
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-ink font-semibold">Proyecto académico</h4>
            <div className="space-y-2 text-sm text-muted-text">
              <p>Alumno: Aguirre Mares Juan Antonio</p>
              <p>Materia: Desarrollo de aplicaciones web en la nube y móviles</p>
              <p>Profesor: ZEUS EMANUEL GUTIERREZ COBIAN</p>
              <p>Calendario: 2026-A</p>
            </div>
          </div>

          {/* Col 3 */}
          <div className="flex justify-start md:justify-end">
            {/* The real logo will be swapped in by the user */}
            <div className="border border-line rounded-lg p-6 flex items-center justify-center bg-accent-soft/30 w-fit h-fit">
              <span className="font-serif text-3xl font-bold tracking-widest text-ink">CUCEI</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-line pt-8 text-center text-sm text-muted-text">
          © 2026 DailyShot Café - Proyecto académico sin fines comerciales
        </div>
      </footer>
    </div>
  );
}
