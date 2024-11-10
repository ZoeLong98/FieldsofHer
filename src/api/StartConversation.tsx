const useStartConversation = (name: string) => {
  if (name) {
    window.location.href = `/conversation?name=${decodeURIComponent(name)}`;
  }
};

export default useStartConversation;
