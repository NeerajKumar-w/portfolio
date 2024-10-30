import './App.css';
import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { PointLight } from 'three';

function Cube(){
  const refContainer = useRef(null);
  const initialized = useRef(false);
  const mousePosition = useRef({x : 0, y : 0});
  useEffect(() => {
    if(!initialized.current){
      initialized.current = true;
      const scene = new THREE.Scene();
      const ambient = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambient)
      const light = new THREE.PointLight( 0xffffff, 2);
      light.position.set(5, 5, 5);
      light.castShadow = true;
      scene.add(light);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(-5, 5, 5); // Positioned opposite the point light
      directionalLight.castShadow = true;
      scene.add(directionalLight);
      const sphereSize = 1;
      const lightHelper = new THREE.PointLightHelper(light, sphereSize);
      scene.add(lightHelper)
      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 500);
      const renderer = new THREE.WebGLRenderer({alpha: true});
      renderer.setSize(100, 100);
      renderer.domElement.style.imageRendering = 'pixelated';
      renderer.domElement.style.width = '400px';
      renderer.domElement.style.height = '400px';
      renderer.shadowMap.enabled = true;
      light.castShadow = true;
      refContainer.current && refContainer.current.appendChild(renderer.domElement);
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshStandardMaterial({color: 0xfabd2f});
      const cube = new THREE.Mesh(geometry, material);
      cube.castShadow = true;
      scene.add(cube);
      camera.position.z = 5;
      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.02;
        renderer.render(scene, camera);
      };
      animate();
    }
  }, []);

  return(
    <div ref={refContainer}></div>
  )
}

function Tbutton(props){
  const audio = new Audio('/assets/btnclick.mp3');
  const [isClicked, setIsClicked] = useState(false);
  const playAudio = () => {
    audio.play()
    setIsClicked(true)
    setTimeout(() => {
      setIsClicked(false);
    }, 100)
  }
  return(
    <div className={`Button ${isClicked ? 'animate' : ''}`} style={{backgroundColor: props.bcolor}}>
      <button className='fButton' onClick={playAudio} style={{backgroundColor: props.fcolor}}><a href={'#' + props.text} style={{textDecoration: 'none', color: '#fbf1c7', height: '100%', width: '100%'}}>{props.text}</a></button>
    </div>
  )
}

function Home(){
  return(
    <section className='container-fluid home' id='Home'>
      <div className='container homebox'>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='nameCursor'>
              <div style={{display:'inline-flex', gap: '5px'}}>
                <div className='name'>Neeraj Kumar D L,</div>
                <div className='cursor'></div>
              </div>
              <div style={{display: 'inline-flex', gap: '5px', alignItems: 'center', justifyContent: 'center'}}>
                <div className='subhead'> $ SoftWare Engineer</div>
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='Tbox'><Cube /></div>
          </div>
        </div>
      </div>
    </section>  
  )
}

const facerecogition = "An Attendance System with Face Recognition automates attendance by detecting and recognizing faces using Python. It uses the Haar Cascade Classifier for face detection, Pillow for image processing, and records attendance in a CSV file with Python’s CSV writer for easy access and tracking."
const employeemanagement = "An Employee Management System built with React and Firebase enables seamless management of employee data with basic CRUD operations. Users can add, view, edit, and delete employee information, all in real time. Firebase handles data storage, retrieval, and synchronization, providing a responsive and scalable solution for efficient employee data management."
const portfolio = "A portfolio website designed with the Gruvbox color palette provides a clean, visually appealing showcase for projects, skills, and experience. The warm, earthy tones of Gruvbox create a unique, vintage aesthetic, enhancing readability and drawing attention to the content. The site layout focuses on simplicity and functionality, allowing visitors to easily navigate through sections and get an engaging overview of the creator’s work."


function ProjectCard(props){
  const cardeffect = new Audio('/assets/cardswipe.mp3')
  const playAudio = () => {
      cardeffect.play()
  }
  return(
    <div className='projectcard' onMouseEnter={playAudio}>
      <div className="projectborder">
        <p className='projecttitle'><span className='legend'>{props.title}</span></p>
        <p className='projectdesc'>{props.desc}</p>
      </div> 
    </div>
  )
}

function Projects(){
  return(
    <section id='Projects' className='container-fluid projects'>
      <div className='container projectsbox'>
        <div className='projectGrid'>
          <ProjectCard title='Face Recognition' desc={facerecogition}/>
          <ProjectCard title='Employee Management' desc={employeemanagement}/>
          <ProjectCard title='Portfolio Website' desc={portfolio}/>
          <ProjectCard title='Future Project'/>
        </div>
      </div>
    </section>
  )
}


function Link(props){
  return(
    <a href={props.link} target='_blank' style={{textDecoration: 'none', width: '100%'}}>
      <div className='linkbox'>
        <div className='linkimgbox'><img className='linkimg' src={props.linkimg}/></div>
        <div className='link'>{props.linktitle}</div>
        <div className='information'>{props.info}</div>
      </div>
    </a>
  )
}


function AboutMe(){
  return(
    <section id='AboutMe' className='container-fluid aboutme'>
      <div className='container aboutmebox'>
        <div className='aboutmeheading'>About Me</div>
        <div className='splitbox'>
          <div className='description'>Hey there! I’m a Linux enthusiast and developer with a passion for building efficient, dynamic applications. My tech journey is grounded in open-source environments, and I’m currently working with Qtile on Wayland to craft a minimalist, productive setup. My skill set spans React, Java, SQL, NoSQL, and Python, allowing me to adapt across both front-end and back-end development needs. In my free time, I love experimenting with Linux configurations and staying on top of the latest in tech. Feel free to explore my work and reach out—I’m always open to new ideas and collaborations!(I use arch BTW)</div>
          <div className='links'>
            <Link info='NeerajKumar-w' linkimg='/assets/github-logo.png' linktitle='Github' link='https://github.com/NeerajKumar-w/NeerajKumar-w'/>
            <Link info='Neeraj Kumar D L' linkimg='/assets/linkedin-logo.png' linktitle='linkedIn' link='https://www.linkedin.com/in/neeraj-kumar-d-l' />
            <Link info='neerajkumar2work@gmail.com' linkimg='/assets/email.png' linktitle='Mail' link='neerajkumar2work@gmail.com' />
            <Link info='9894644369' linkimg='/assets/telephone-symbol-button.png' linktitle='phone. No' />
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="container-fluid wbox">
      <div className="Topbar">
        <Tbutton bcolor={'#cc241d'} fcolor={'#fb4934'} text={'Home'} />
        <Tbutton bcolor={'#98971a'} fcolor={'#b8bb26'} text={'Projects'} />
        <Tbutton bcolor={'#458588'} fcolor={'#83a598'} text={'AboutMe'} />
        <Tbutton bcolor={'#b16286'} fcolor={'#d3869b'} text={'Resume'} />
      </div>
      <Home />
      <Projects />
      <AboutMe />
    </div>
  );
}

export default App;
