import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slideOpt = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  }

  slides = [
    {
      id: 0,
      title: "MUSICAPP",
      subtitle: "musica",
      description: "El arte de crear y organizar sonidos y silencios respetando los principios fundamentales de la melodía, la armonía y el ritmo.",
      image: "assets/images/logo.png",
      alt: "imagen de logo"
    },
    {
      id: 1,
      title: "TU LISTA DE SONIDO",
      subtitle: "",
      description: "Disfruta de tu contenido musical",
      icon: "",
      image: "assets/images/guitarra_mujer.jpg",
      alt: "imagen de musica"
    },
    { 
      id: 2,
      title: "ESTILO",
      subtitle: "",
      description: "Personaliza tu perfil musical",
      icon: "pause-outline",
      image: "assets/images/musica2.jpeg",
      alt: "imagen de musica 2"
    },
  {
    id: 3,
    title: "DISFRUTA",
    subtitle: "",
    description: "",
    icon: "pause-outline",
    image: "assets/images/guitarragif.gif",
    alt: "imagen de musica 2"
  }
  ]
  constructor(private router: Router, private storage: Storage) { 
    this.storage.create();
  }

  finish() {
    this.storage.set("intro", true);
    this.router.navigateByUrl("/login");
  }

  ngOnInit() {
  }

}
