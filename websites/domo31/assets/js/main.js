/* =========================================================
   DOMO 31 — Interactions du site
   Aucune dépendance externe.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector("[data-burger]");
  var nav = document.querySelector("[data-nav]");

  function fermerMenu() {
    if (!burger || !nav) return;
    burger.setAttribute("aria-expanded", "false");
    nav.setAttribute("data-ouvert", "false");
    document.body.style.removeProperty("overflow");
  }

  if (burger && nav) {
    burger.addEventListener("click", function () {
      var ouvert = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!ouvert));
      nav.setAttribute("data-ouvert", String(!ouvert));
      document.body.style.overflow = !ouvert ? "hidden" : "";
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) fermerMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") fermerMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) fermerMenu();
    });
  }

  /* ---------- Année courante dans le pied de page ---------- */
  Array.prototype.forEach.call(
    document.querySelectorAll("[data-annee]"),
    function (el) {
      el.textContent = String(new Date().getFullYear());
    }
  );

  /* ---------- Formulaire de demande de devis ----------
     Le site est statique : par défaut, le formulaire prépare un e-mail
     pré-rempli vers contact@domo31.fr. Pour un envoi côté serveur,
     renseigner data-endpoint sur le <form> (voir README).
  --------------------------------------------------------- */
  var formulaire = document.querySelector("[data-formulaire-devis]");

  if (formulaire) {
    var zoneMessage = formulaire.querySelector("[data-message]");

    var afficherMessage = function (texte) {
      if (!zoneMessage) return;
      zoneMessage.textContent = texte;
      zoneMessage.hidden = false;
    };

    formulaire.addEventListener("submit", function (e) {
      if (!formulaire.checkValidity()) return; // laisse le navigateur signaler

      var endpoint = formulaire.getAttribute("data-endpoint");
      if (endpoint) return; // envoi POST classique vers le back-end

      e.preventDefault();

      var donnees = new FormData(formulaire);
      var libelles = {
        nom: "Nom",
        email: "E-mail",
        telephone: "Téléphone",
        codePostal: "Code postal",
        projet: "Type de projet",
        delai: "Échéance",
        message: "Description"
      };

      var lignes = Object.keys(libelles)
        .map(function (cle) {
          var valeur = (donnees.get(cle) || "").toString().trim();
          return valeur ? libelles[cle] + " : " + valeur : null;
        })
        .filter(Boolean);

      var sujet =
        "Demande de devis — " +
        ((donnees.get("projet") || "projet menuiseries").toString());

      var lien =
        "mailto:contact@domo31.fr" +
        "?subject=" + encodeURIComponent(sujet) +
        "&body=" + encodeURIComponent(lignes.join("\n") + "\n");

      window.location.href = lien;

      afficherMessage(
        "Votre logiciel de messagerie s'ouvre avec la demande pré-remplie. " +
          "Si rien ne se passe, écrivez-nous directement à contact@domo31.fr " +
          "ou appelez le 05 34 25 66 66."
      );
    });
  }

  /* ---------- Apparition douce au défilement ----------
     Volontairement basée sur getBoundingClientRect plutôt que sur
     IntersectionObserver : le rendu reste correct même quand le
     défilement est programmatique (outils de capture, tests, impression).
  --------------------------------------------------------- */
  var animables = Array.prototype.slice.call(document.querySelectorAll("[data-anim]"));
  var reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (animables.length && !reduit) {
    animables.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = "opacity .6s ease, transform .6s ease";
    });

    var enAttente = false;

    var reveler = function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.removeAttribute("data-anim");
    };

    var verifier = function () {
      enAttente = false;
      var limite = window.innerHeight - 60;
      animables = animables.filter(function (el) {
        var haut = el.getBoundingClientRect().top;
        if (haut < limite) { reveler(el); return false; }
        return true;
      });
      if (!animables.length) {
        window.removeEventListener("scroll", planifier);
        window.removeEventListener("resize", planifier);
      }
    };

    var planifier = function () {
      if (enAttente) return;
      enAttente = true;
      window.requestAnimationFrame(verifier);
    };

    window.addEventListener("scroll", planifier, { passive: true });
    window.addEventListener("resize", planifier);
    window.addEventListener("load", planifier);
    // filet de sécurité : rien ne doit rester invisible avant impression
    window.addEventListener("beforeprint", function () {
      animables.forEach(reveler);
      animables = [];
    });
    verifier();
  }

})();
