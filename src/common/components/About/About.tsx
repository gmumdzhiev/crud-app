export const About = () => {
    return (
        <section className="rounded-md pt-10 overflow-hidden bg-gray-50 dark:bg-gray-800 md:pt-0 sm:pt-16 2xl:pt-16">
            <div className="p-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid items-center grid-cols-1 md:grid-cols-2">
                    <div>
                        <h2 className="text-3xl font-bold leading-tight text-[#474747] dark:text-white sm:text-4xl lg:text-5xl">
                            Hey 👋 I am
                            <br />
                            Georgi Mumdzhiev
                        </h2>
                        <p className="mt-4 text-xl text-[#8f8f8f] dark:text-gray-300 md:mt-8">
                            a passionate software developer 🚀 with a love for solving problems and building amazing experiences 💻. When I'm not coding, you'll find me exploring new tech trends 🌐 or collaborating with fellow developers to create something truly awesome 🌟.
                            <br />
                            Got any questions? Feel free to reach out! 😊 I'd love to connect with you on LinkedIn! 💼 Let’s build something great together. 💡✨
                            <br />
                            👉 <a href="https://www.linkedin.com/in/georgi-mumdzhiev/" className="transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 hover:underline">Connect with me on LinkedIn</a>
                            <br />
                            Make sure to check out my other cool projects here: <a href="https://www.github.com/gmumdzhiev" className="transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 hover:underline">www.github.com</a>
                        </p>
                    </div>

                    <div className="relative">
                        <img className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src="/author/author.png" alt="Author Image"/>
                    </div>
                </div>
            </div>
        </section>


    );
};
