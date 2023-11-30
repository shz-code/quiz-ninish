import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateOutlet from "./PrivateOutlet";
import ProtectedOutlet from "./ProtectedOutlet";
import PublicOutlet from "./PublicOutlet";
import RestrictedOutlet from "./RestrictedOutlet";
import Layout from "./components/Layout";
import Login from "./components/pages/Login";
import NewReg from "./components/pages/NewReg";
import QuizPage from "./components/pages/QuizPage";
import Certificate from "./components/pages/subpage/Certificate";
import Download from "./components/pages/subpage/Download";
import QuizLayout from "./components/pages/subpage/quiz/QuizLayout";
import ContextProvider from "./contextApi/Provider";

function App() {
  return (
    <Router>
      <ContextProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Layout>
          <Routes>
            {/* Pages that only visible to anonymous user */}
            <Route
              path="/"
              element={
                <PublicOutlet>
                  <Login />
                </PublicOutlet>
              }
            />
            {/* Pages that only visible to logged in user */}
            <Route
              path="/n"
              element={
                <PrivateOutlet>
                  <NewReg />
                </PrivateOutlet>
              }
            />
            <Route
              path="/quiz"
              element={
                <PrivateOutlet>
                  <QuizPage />
                </PrivateOutlet>
              }
            />
            <Route
              path="/mujib-olympiad-dhaka-23"
              element={
                <ProtectedOutlet>
                  <QuizLayout />
                </ProtectedOutlet>
              }
            />
            <Route
              path="/certificate"
              element={
                <RestrictedOutlet>
                  <Certificate />
                </RestrictedOutlet>
              }
            />
            <Route
              path="/download"
              element={
                <RestrictedOutlet>
                  <Download />
                </RestrictedOutlet>
              }
            />
          </Routes>
        </Layout>
      </ContextProvider>
    </Router>
  );
}

export default App;
