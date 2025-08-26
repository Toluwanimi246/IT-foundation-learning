import Footer from "../Components/footer";
import Navbar from "../Components/navbar"

export default function About() {
  return (
    <div>
      <Navbar /> 
        <div className="relative"> 
          <img src = "/notebook.jpg"></img>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                bg-white shadow-sm p-5 w-11/12 md:w-2/5 rounded">
            <h1 className="p-2 md:text-4xl sm:text-3xl">ABOUT</h1>
            <p className="md:text-lg sm:text-sm py-3">
              Hi there! I’m a university student doing her internship at ConnectSphere, and creator of a blog that just started as a intern project. I figured that if I'm creating a blog, might as well give it my all, right?
              I work with alone but I had a wonderful set of seniors to help me.
              As an artist, writer and all-round creative enjoyer, I hope you have a great time here.
            </p>
            <p className="md:text-lg sm:text-sm">Welcome to CreateSphere! </p>
          </div>
        </div>

        <div className="md:px-35 sm:px-7 py-20 md:py-4 md:m-10 sm:m-2 md:text-lg sm:text-sm">
          What makes CreateSphere content stand out? It doesn't.
          I mean, there have to be tons of art blogs out there, right?
          This is literally just a backend project I designed but I really am passionate about every single post on here.
          The information here is updated and genuine, brought from our wonderful team of admins-
          Me.
          <div className="py-2">
            From drawing tips, to the latest novel, new breakthroughs in animation and how it affects the world around us,
            this blog makes sure you leave with a million notes on your phone and a head swimming with inspiration.
            And maybe even the encouragement to start a creative journey all on your own.
          </div>
          <div className="py-2">
            CreateSphere is that in a nutshell: creative related content brought from the heart of a passionate teenager.
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 m-4">
          <div className="sm:pl-4 md:pl-20 h-64 md:h-96">
            <img src = "/girl_book1.jpg" 
              className="w-full h-full object-cover" 
              alt="girl reading book">
            </img>
          </div>

          <div className="md:pr-20 sm:pr-4 h-64 md:h-96">
            <img src = "/mickey_porch.jpg"
              className="w-full h-full object-cover" 
              alt="mickey mouse on a small stage">
            </img>
          </div>

          <div className="md:pl-20 sm:pl-4 h-64 md:h-96">
            <img src = "/paint_brush.jpg"
              className="w-full h-full object-cover" 
              alt="paint brushes">
            </img>
          </div>

          <div className="pr-20 pl-10 h-64 md:h-96 flex flex-col justify-center">
            <h1 className="text-3xl py-9">CreateSphere IN THE PRESS</h1>
            <p className="text-lg">
              CreateSphere is one of the backend projects I've done in this internship, 
              so it's not really in the public eye.
              So if you see this website, it means I was able to push to production and host it.
            </p>
          </div>
        </div>

        <div className="my-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 m-4">
            <div className="pl-20 h-64 md:h-96">
              <img src = "/phone_text.jpg"
                className="w-full h-full object-cover" 
                alt="sending message">
              </img>
            </div>

            <div className="pr-20 pl-10 h-170 flex flex-col justify-center">
              <h1 className="text-3xl py-9">CONTACT US</h1>
              <p className="text-lg">
                Hi, got a question or interested in sharing a tip? Please email me at 
                <span className="text-blue-900"> tolualade13@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  );
}
