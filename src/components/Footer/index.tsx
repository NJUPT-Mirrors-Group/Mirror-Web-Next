import Image from "next/image";
export default function Footer() {
  return (
    <footer className="w-full bg-black mt-8 text-white text-sm">
      <div className=" mx-auto max-w-7xl p-6 w-full">
        <div className="flex justify-between items-center">
          <div className="w-full flex gap-3 flex-wrap justify-between">
            <div className="pt-10">
              <h1 className="text-xl font-bold">Contact us</h1>
              <div className="mt-2">
                <ul className="flex flex-col gap-2">
                  <li className="text-gray-400 hover:text-white">
                    <a href="https://github.com/NJUPT-Mirrors-Group">github</a>
                  </li>
                  <li className="text-gray-400 hover:text-white">
                    <a href="Mailto:mirrors@njupt.edu.cn">
                      mirrors@njupt.edu.cn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-10">
              <h1 className="text-xl font-bold">Links</h1>
              <div className="mt-2">
                <ul className="flex flex-col gap-2">
                  <li className="text-gray-400 hover:text-white">
                    <a href="https://xxb.njupt.edu.cn">南邮信息办</a>
                  </li>
                  <li className="text-gray-400 hover:text-white">
                    <a href="https://qingyou.njupt.edu.cn">青柚工作室</a>
                  </li>
                  <li className="text-gray-400 hover:text-white">
                    <a href="https://sast.fun">南邮校大学生科协</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-10">
              <h1 className="text-xl font-bold">Feishu Group</h1>
              <div className="mt-2">
                <Image
                  src="/qrcode.jpeg"
                  alt="qrcode"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div>
              <Image src="/logo-long.png" alt="logo" width={200} height={30} />
            </div>
          </div>
        </div>
        <div className="mt-9 pb-10 text-gray-400">
          <p>
            本站由南京邮电大学信息化建设和管理办公室支持并创办，由南京邮电大学NMG小组运行维护。
          </p>
          <p>
            Powered by <a href="https://mxte.cc">Maxtune Lee</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
