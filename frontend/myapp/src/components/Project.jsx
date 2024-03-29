// import ProjectsLayout from "./Project/AllPages/ProjectLayout";
import { Link } from "react-router-dom";
import create_project from "../components/Images/create_project.png"
import search_project from "../components/Images/search_project.png"
// import { useNavigate } from "react-router-dom";
const Project = () => {
  // const navigate=useNavigate()
  const userRole = localStorage.getItem('role');
  return (
    <>
      {/* <div class="h-screen flex justify-around items-center bg-black">
        <div>
          <div class="max-w-sm rounded overflow-hidden   shadow-white shadow-lg">
            <img
              class="w-full"
              src={create_project}
              alt="create new projects"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Create New projects</div>
              <p class="text-white text-base">
                You can create new renewable Projects along with other details
              </p>
              <div class="text-center">

              <Link
                  to="/projectsdetails" // Specify the path to navigate to
                  className="bg-[#3d3d3d] hover:text-[#3d3d3d] hover:bg-[#b9b9b9] hover:font-bold text-white font-normal py-2 px-3 rounded focus:outline-none focus:shadow-outline content-center mt-1"
                >
                  Create
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
        <div class="max-w-sm rounded overflow-hidden   shadow-white shadow-lg">
            <img
              class="w-full"
              src={search_project}
              alt="search for prjects"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Search For Projects</div>
              <p class="text-white text-base">
                Search for the existing renwable projects in the world
              </p>
              <div class="text-center">
              <Link
                  to="/search" // Specify the path to navigate to

                  className="bg-[#3d3d3d] hover:text-[#3d3d3d] hover:bg-[#b9b9b9] hover:font-bold text-white font-normal py-2 px-3 rounded focus:outline-none focus:shadow-outline content-center mt-1"

                >
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="h-screen flex justify-around items-center bg-[#202020]">
        {userRole === 'admin' && (
          <div>
            <div className="max-w-sm rounded overflow-hidden  shadow-lg bg-white">
              <img
                className="w-full"
                src={create_project}
                alt="create new projects"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Create New projects</div>
                <p className="text-[#303030] text-base">
                  You can create new renewable Projects along with other details
                </p>
                <div className="text-center">
                  <Link
                    to="/projectsdetails" // Specify the path to navigate to
                    className="bg-[#3d3d3d] hover:text-[#3d3d3d] hover:bg-[#b9b9b9] hover:font-bold text-white font-normal py-2 px-3 rounded focus:outline-none focus:shadow-outline content-center mt-1"
                  >
                    Create
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {(userRole === 'admin' || userRole === 'guest') && (
          <div>
            <div className="max-w-sm rounded overflow-hidden  shadow-lg bg-white">
              <img
                className="w-full"
                src={search_project}
                alt="search for projects"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Search For Projects</div>
                <p className="text-[#303030] text-base">
                  Search for the existing renewable projects in the world
                </p>
                <div className="text-center">
                  <Link
                    to="/search" // Specify the path to navigate to
                    className="bg-[#3d3d3d] hover:text-[#3d3d3d] hover:bg-[#b9b9b9] hover:font-bold text-white font-normal py-2 px-3 rounded focus:outline-none focus:shadow-outline content-center mt-1"
                  >
                    Search
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Project;
