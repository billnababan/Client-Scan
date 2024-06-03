export default function FormAction({ handleSubmit, type = "Button", action = "submit", text }) {
  return (
    <>
      {type === "Button" ? (
        <button
          type={action}
          className="group relative w-[150px] mx-auto  flex  justify-center py-2 px-4 border border-transparent text-sm font-medium hover:rounded-md text-white bg-primary hover:bg-blue-500 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          onSubmit={handleSubmit}
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
