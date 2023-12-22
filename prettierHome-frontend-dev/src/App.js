import AppRouter from "./router";
import Loading from "./components/loading/LogoLoading";
import { useEffect, useState } from "react";
import { getUser } from "./api/auth-service";
import { login, logout } from "./store/slices/auth-slice";
import { useDispatch } from "react-redux";
import { PopupProvider } from "./store/providers/toast-provider";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      const resp = await getUser();
      dispatch(login(resp));
    } catch (err) {
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  return (
    <PopupProvider>
      {loading ? <Loading size={120} /> : <AppRouter />}
    </PopupProvider>
  );
}

export default App;
