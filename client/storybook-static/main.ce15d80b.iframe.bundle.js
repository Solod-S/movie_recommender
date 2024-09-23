(self.webpackChunkclient = self.webpackChunkclient || []).push([
  [792],
  {
    "./node_modules/@storybook/instrumenter/dist sync recursive": module => {
      function webpackEmptyContext(req) {
        var e = new Error("Cannot find module '" + req + "'");
        throw ((e.code = "MODULE_NOT_FOUND"), e);
      }
      (webpackEmptyContext.keys = () => []),
        (webpackEmptyContext.resolve = webpackEmptyContext),
        (webpackEmptyContext.id =
          "./node_modules/@storybook/instrumenter/dist sync recursive"),
        (module.exports = webpackEmptyContext);
    },
    "./storybook-config-entry.js": (
      __unused_webpack_module,
      __unused_webpack___webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      var external_STORYBOOK_MODULE_GLOBAL_ =
          __webpack_require__("@storybook/global"),
        external_STORYBOOK_MODULE_PREVIEW_API_ = __webpack_require__(
          "storybook/internal/preview-api"
        ),
        external_STORYBOOK_MODULE_CHANNELS_ = __webpack_require__(
          "storybook/internal/channels"
        );
      const importers = [
        async path => {
          if (
            !/^\.[\\/](?:src(?:[\\/](?!\.)(?:(?:(?!(?:^|[\\/])\.).)*?)[\\/]|[\\/]|$)(?!\.)(?=.)[^\\/]*?\.mdx)$/.exec(
              path
            )
          )
            return;
          const pathRemainder = path.substring(6);
          return __webpack_require__(
            "./src lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:[\\\\/]src(?:[\\\\/](?%21\\.)(?:(?:(?%21(?:^%7C[\\\\/])\\.).)*?)[\\\\/]%7C[\\\\/]%7C$)(?%21\\.)(?=.)[^\\\\/]*?\\.mdx)$"
          )("./" + pathRemainder);
        },
        async path => {
          if (
            !/^\.[\\/](?:src(?:[\\/](?!\.)(?:(?:(?!(?:^|[\\/])\.).)*?)[\\/]|[\\/]|$)(?!\.)(?=.)[^\\/]*?\.stories\.(js|jsx|mjs|ts|tsx))$/.exec(
              path
            )
          )
            return;
          const pathRemainder = path.substring(6);
          return __webpack_require__(
            "./src lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:[\\\\/]src(?:[\\\\/](?%21\\.)(?:(?:(?%21(?:^%7C[\\\\/])\\.).)*?)[\\\\/]%7C[\\\\/]%7C$)(?%21\\.)(?=.)[^\\\\/]*?\\.stories\\.(js%7Cjsx%7Cmjs%7Cts%7Ctsx))$"
          )("./" + pathRemainder);
        },
      ];
      const channel = (0,
      external_STORYBOOK_MODULE_CHANNELS_.createBrowserChannel)({
        page: "preview",
      });
      external_STORYBOOK_MODULE_PREVIEW_API_.addons.setChannel(channel),
        "DEVELOPMENT" ===
          external_STORYBOOK_MODULE_GLOBAL_.global.CONFIG_TYPE &&
          (window.__STORYBOOK_SERVER_CHANNEL__ = channel);
      const preview = new external_STORYBOOK_MODULE_PREVIEW_API_.PreviewWeb(
        async function importFn(path) {
          for (let i = 0; i < importers.length; i++) {
            const moduleExports = await ((x = () => importers[i](path)), x());
            if (moduleExports) return moduleExports;
          }
          var x;
        },
        () =>
          (0, external_STORYBOOK_MODULE_PREVIEW_API_.composeConfigs)([
            __webpack_require__(
              "./node_modules/@storybook/react/dist/entry-preview.mjs"
            ),
            __webpack_require__(
              "./node_modules/@storybook/react/dist/entry-preview-docs.mjs"
            ),
            __webpack_require__(
              "./node_modules/@storybook/addon-links/dist/preview.mjs"
            ),
            __webpack_require__(
              "./node_modules/@storybook/addon-essentials/dist/actions/preview.mjs"
            ),
            __webpack_require__(
              "./node_modules/@storybook/addon-essentials/dist/backgrounds/preview.mjs"
            ),
            __webpack_require__(
              "./node_modules/@storybook/addon-essentials/dist/viewport/preview.mjs"
            ),
            __webpack_require__(
              "./node_modules/@storybook/addon-essentials/dist/measure/preview.mjs"
            ),
            __webpack_require__(
              "./node_modules/@storybook/addon-essentials/dist/outline/preview.mjs"
            ),
            __webpack_require__(
              "./node_modules/@storybook/addon-essentials/dist/highlight/preview.mjs"
            ),
            __webpack_require__(
              "./node_modules/@storybook/addon-interactions/dist/preview.mjs"
            ),
            __webpack_require__(
              "./node_modules/@storybook/addon-docs/dist/preview.mjs"
            ),
            __webpack_require__("./.storybook/preview.js"),
          ])
      );
      (window.__STORYBOOK_PREVIEW__ = preview),
        (window.__STORYBOOK_STORY_STORE__ = preview.storyStore),
        (window.__STORYBOOK_ADDONS_CHANNEL__ = channel);
    },
    "./src/constants/index.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        AQ: () => STORAGE_LOCALE_KEY,
        LV: () => framerLogoVariants,
        YZ: () => LOCALES,
      });
      const STORAGE_LOCALE_KEY = "locale",
        LOCALES = { ENGLISH: "en-us", GERMAN: "de-de", FRENCH: "fr-ca" },
        framerLogoVariants = {
          start: { rotate: 0, scale: 1.1 },
          end: { rotate: 5, scale: 1.2 },
          transition_img: {
            ease: "easeOut",
            duration: 8,
            repeat: 1 / 0,
            repeatType: "reverse",
          },
        };
    },
    "./src/providers/appContext/index.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        B: () => AppContext,
        Q: () => AppContextProvider,
      });
      var react = __webpack_require__("./node_modules/react/index.js");
      const getFromStorage = name => {
        if (!window || !window.localStorage) return null;
        try {
          return JSON.parse(window.localStorage.getItem(name));
        } catch (e) {
          return null;
        }
      };
      var constants = __webpack_require__("./src/constants/index.js"),
        dist = __webpack_require__(
          "./node_modules/react-router-dom/dist/index.js"
        );
      var jsx_runtime = __webpack_require__(
        "./node_modules/react/jsx-runtime.js"
      );
      const AppContext = (0, react.createContext)();
      let reducer = (state, action) => {
        return "setLocale" === action.type
          ? ((name = constants.AQ),
            (data = action.locale),
            window &&
              window.localStorage &&
              window.localStorage.setItem(name, JSON.stringify(data)),
            { ...state, locale: action.locale })
          : state;
        var name, data;
      };
      const AppContextProvider = _ref => {
        let { children } = _ref;
        const defaultContext = (() => {
            const [searchParams] = (0, dist.ok)();
            return {
              locale:
                getFromStorage(constants.AQ) ||
                searchParams.get("locale") ||
                constants.YZ.ENGLISH,
            };
          })(),
          [state, dispatch] = (0, react.useReducer)(reducer, defaultContext),
          value = { state, dispatch };
        return (0, jsx_runtime.jsx)(AppContext.Provider, { value, children });
      };
      AppContextProvider.__docgenInfo = {
        description: "",
        methods: [],
        displayName: "AppContextProvider",
      };
    },
    "./.storybook/preview.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          default: () => _storybook_preview,
        });
      var dist = __webpack_require__(
          "./node_modules/react-router-dom/dist/index.js"
        ),
        appContext = __webpack_require__("./src/providers/appContext/index.js"),
        react = __webpack_require__("./node_modules/react/index.js"),
        provider = __webpack_require__(
          "./node_modules/react-intl/lib/src/components/provider.js"
        ),
        flat = __webpack_require__("./node_modules/flat/index.js"),
        constants = __webpack_require__("./src/constants/index.js");
      const messages = {
        ...{
          [constants.YZ.ENGLISH]: {
            tooltip: { generate_msg: "Click to generate a link" },
            navigation: {
              home: "Movies recommendation",
              settings: "Settings",
              homeBtn: "Home",
              favoriteBtn: "Favorite",
              loginBtn: "Login",
            },
            footer: {
              privacy_policy: "Privacy Policy",
              about_author: "About author",
              rights: "All rights reserved.",
            },
            filters: {
              search: { label: "Search" },
              genre: { label: "Genre", allGenres: "All Genres" },
              year: { label: "Year", allYears: "All Years" },
              sortBy: {
                label: "Sort By",
                popularity: "Popularity",
                releaseDate: "Release Date",
                title: "Title",
                voteAverage: "Vote Average",
                voteCount: "Vote Count",
              },
            },
            movie_details: {
              vote: "Vote",
              release_date: "Release Date",
              original_title: "Original Title",
              genre: "Genre",
              cast: "Cast",
              reviews: "Reviews",
              remove_selected_btn: "Remove from Selected",
              add_to_selected_btn: "Add to Selected",
            },
            notification: {
              movie_already_selected:
                "This movie is already on the selected movies list.",
              list_limit_reached: "The limit of the list has been reached.",
              movie_added_successfully:
                "The movie has been successfully added to the list.",
              movie_removed_successfully:
                "The movie has been successfully removed from the list.",
            },
            no_selected_movies: "No selected movies",
            put_the_list_name: "Put the list name",
            share_with_friends: "Share with friends",
            copied: "Copied!",
            select: "Select",
            delete: "Delete",
          },
        },
        ...{
          [constants.YZ.GERMAN]: {
            tooltip: {
              generate_msg: "Klicken Sie, um einen Link zu generieren",
            },
            navigation: {
              home: "Filme Empfehlung",
              settings: "Einstellungen",
              homeBtn: "Startseite",
              favoriteBtn: "Favoriten",
              loginBtn: "Anmelden",
            },
            footer: {
              privacy_policy: "Datenschutzbestimmungen",
              about_author: "Über den Autor",
              rights: "Alle Rechte vorbehalten.",
            },
            filters: {
              search: { label: "Suche" },
              genre: { label: "Genre", allGenres: "Alle Genres" },
              year: { label: "Jahr", allYears: "Alle Jahre" },
              sortBy: {
                label: "Sortieren nach",
                popularity: "Beliebtheit",
                releaseDate: "Veröffentlichungsdatum",
                title: "Titel",
                voteAverage: "Durchschnittliche Bewertung",
                voteCount: "Anzahl der Stimmen",
              },
            },
            movie_details: {
              vote: "Abstimmung",
              release_date: "Veröffentlichungsdatum",
              original_title: "Originaltitel",
              genre: "Genre",
              cast: "Besetzung",
              reviews: "Bewertungen",
              remove_selected_btn: "Aus Auswahl entfernen",
              add_to_selected_btn: "Zur Auswahl hinzufügen",
            },
            notification: {
              movie_already_selected:
                "Dieser Film ist bereits in der Liste der ausgewählten Filme.",
              list_limit_reached: "Das Limit der Liste wurde erreicht.",
              movie_added_successfully:
                "Der Film wurde erfolgreich zur Liste hinzugefügt.",
              movie_removed_successfully:
                "Der Film wurde erfolgreich von der Liste entfernt.",
            },
            no_selected_movies: "Keine ausgewählten Filme",
            put_the_list_name: "Listenname eingeben",
            share_with_friends: "Mit Freunden teilen",
            copied: "Kopiert!",
            select: "Auswählen",
            delete: "Löschen",
          },
        },
        ...{
          [constants.YZ.FRENCH]: {
            tooltip: { generate_msg: "Cliquez pour générer un lien" },
            navigation: {
              home: "Recommandation de films",
              settings: "Paramètres",
              homeBtn: "Accueil",
              favoriteBtn: "Favoris",
              loginBtn: "Connexion",
            },
            footer: {
              privacy_policy: "Politique de confidentialité",
              about_author: "À propos de l'auteur",
              rights: "Tous droits réservés.",
            },
            filters: {
              search: { label: "Recherche" },
              genre: { label: "Genre", allGenres: "Tous les genres" },
              year: { label: "Année", allYears: "Toutes les années" },
              sortBy: {
                label: "Trier par",
                popularity: "Popularité",
                releaseDate: "Date de sortie",
                title: "Titre",
                voteAverage: "Moyenne des votes",
                voteCount: "Nombre de votes",
              },
            },
            movie_details: {
              vote: "Vote",
              release_date: "Date de sortie",
              original_title: "Titre original",
              genre: "Genre",
              cast: "Distribution",
              reviews: "Avis",
              remove_selected_btn: "Retirer de la sélection",
              add_to_selected_btn: "Ajouter à la sélection",
            },
            notification: {
              movie_already_selected:
                "Ce film est déjà dans la liste des films sélectionnés.",
              list_limit_reached: "La limite de la liste a été atteinte.",
              movie_added_successfully:
                "Le film a été ajouté avec succès à la liste.",
              movie_removed_successfully:
                "Le film a été retiré avec succès de la liste.",
            },
            no_selected_movies: "Aucun film sélectionné",
            put_the_list_name: "Entrez le nom de la liste",
            share_with_friends: "Partager avec des amis",
            copied: "Copié !",
            select: "Sélectionner",
            delete: "Supprimer",
          },
        },
      };
      var jsx_runtime = __webpack_require__(
        "./node_modules/react/jsx-runtime.js"
      );
      const Provider = _ref => {
        let { children, locale = constants.YZ.ENGLISH } = _ref;
        return (0, jsx_runtime.jsx)(provider.A, {
          textComponent: react.Fragment,
          locale,
          messages: (0, flat.B)(messages[locale]),
          children,
        });
      };
      Provider.displayName = "I18nProvider";
      const i18n = Provider;
      Provider.__docgenInfo = {
        description: "",
        methods: [],
        displayName: "I18nProvider",
        props: {
          locale: {
            defaultValue: { value: '"en-us"', computed: !1 },
            description: "",
            type: {
              name: "enum",
              value: [
                { value: '"en-us"', computed: !1 },
                { value: '"de-de"', computed: !1 },
                { value: '"fr-ca"', computed: !1 },
              ],
            },
            required: !1,
          },
          children: {
            description: "",
            type: {
              name: "union",
              value: [
                { name: "arrayOf", value: { name: "node" } },
                { name: "node" },
              ],
            },
            required: !0,
          },
        },
      };
      const _storybook_preview = {
        parameters: {
          controls: {
            matchers: { color: /(background|color)$/i, date: /Date$/i },
          },
        },
        decorators: [
          Story =>
            (0, jsx_runtime.jsx)(dist.Kd, {
              children: (0, jsx_runtime.jsx)(appContext.Q, {
                children: (0, jsx_runtime.jsx)(i18n, {
                  locale: "en-us",
                  children: (0, jsx_runtime.jsx)(Story, {}),
                }),
              }),
            }),
        ],
      };
    },
    "./src lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:[\\\\/]src(?:[\\\\/](?%21\\.)(?:(?:(?%21(?:^%7C[\\\\/])\\.).)*?)[\\\\/]%7C[\\\\/]%7C$)(?%21\\.)(?=.)[^\\\\/]*?\\.mdx)$":
      (module, __unused_webpack_exports, __webpack_require__) => {
        var map = {
          "./stories/Configure.mdx": ["./src/stories/Configure.mdx", 95, 187],
        };
        function webpackAsyncContext(req) {
          if (!__webpack_require__.o(map, req))
            return Promise.resolve().then(() => {
              var e = new Error("Cannot find module '" + req + "'");
              throw ((e.code = "MODULE_NOT_FOUND"), e);
            });
          var ids = map[req],
            id = ids[0];
          return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() =>
            __webpack_require__(id)
          );
        }
        (webpackAsyncContext.keys = () => Object.keys(map)),
          (webpackAsyncContext.id =
            "./src lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:[\\\\/]src(?:[\\\\/](?%21\\.)(?:(?:(?%21(?:^%7C[\\\\/])\\.).)*?)[\\\\/]%7C[\\\\/]%7C$)(?%21\\.)(?=.)[^\\\\/]*?\\.mdx)$"),
          (module.exports = webpackAsyncContext);
      },
    "./src lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:[\\\\/]src(?:[\\\\/](?%21\\.)(?:(?:(?%21(?:^%7C[\\\\/])\\.).)*?)[\\\\/]%7C[\\\\/]%7C$)(?%21\\.)(?=.)[^\\\\/]*?\\.stories\\.(js%7Cjsx%7Cmjs%7Cts%7Ctsx))$":
      (module, __unused_webpack_exports, __webpack_require__) => {
        var map = {
          "./stories/ConfirmModal.stories": [
            "./src/stories/ConfirmModal.stories.js",
            994,
            410,
            136,
          ],
          "./stories/ConfirmModal.stories.js": [
            "./src/stories/ConfirmModal.stories.js",
            994,
            410,
            136,
          ],
          "./stories/Filters.stories": [
            "./src/stories/Filters.stories.js",
            994,
            410,
            348,
          ],
          "./stories/Filters.stories.js": [
            "./src/stories/Filters.stories.js",
            994,
            410,
            348,
          ],
          "./stories/MovieCard.stories": [
            "./src/stories/MovieCard.stories.js",
            994,
            622,
            410,
            727,
          ],
          "./stories/MovieCard.stories.js": [
            "./src/stories/MovieCard.stories.js",
            994,
            622,
            410,
            727,
          ],
          "./stories/MovieCardSelected.stories": [
            "./src/stories/MovieCardSelected.stories.js",
            994,
            622,
            410,
            448,
          ],
          "./stories/MovieCardSelected.stories.js": [
            "./src/stories/MovieCardSelected.stories.js",
            994,
            622,
            410,
            448,
          ],
          "./stories/Navigation.stories": [
            "./src/stories/Navigation.stories.js",
            994,
            410,
            501,
          ],
          "./stories/Navigation.stories.js": [
            "./src/stories/Navigation.stories.js",
            994,
            410,
            501,
          ],
          "./stories/Paginator.stories": [
            "./src/stories/Paginator.stories.js",
            994,
            410,
            904,
          ],
          "./stories/Paginator.stories.js": [
            "./src/stories/Paginator.stories.js",
            994,
            410,
            904,
          ],
          "./stories/SelectedMoviesSection.stories": [
            "./src/stories/SelectedMoviesSection.stories.js",
            994,
            622,
            410,
            0,
          ],
          "./stories/SelectedMoviesSection.stories.js": [
            "./src/stories/SelectedMoviesSection.stories.js",
            994,
            622,
            410,
            0,
          ],
        };
        function webpackAsyncContext(req) {
          if (!__webpack_require__.o(map, req))
            return Promise.resolve().then(() => {
              var e = new Error("Cannot find module '" + req + "'");
              throw ((e.code = "MODULE_NOT_FOUND"), e);
            });
          var ids = map[req],
            id = ids[0];
          return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() =>
            __webpack_require__(id)
          );
        }
        (webpackAsyncContext.keys = () => Object.keys(map)),
          (webpackAsyncContext.id =
            "./src lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:[\\\\/]src(?:[\\\\/](?%21\\.)(?:(?:(?%21(?:^%7C[\\\\/])\\.).)*?)[\\\\/]%7C[\\\\/]%7C$)(?%21\\.)(?=.)[^\\\\/]*?\\.stories\\.(js%7Cjsx%7Cmjs%7Cts%7Ctsx))$"),
          (module.exports = webpackAsyncContext);
      },
    "storybook/internal/channels": module => {
      "use strict";
      module.exports = __STORYBOOK_MODULE_CHANNELS__;
    },
    "storybook/internal/client-logger": module => {
      "use strict";
      module.exports = __STORYBOOK_MODULE_CLIENT_LOGGER__;
    },
    "storybook/internal/preview-errors": module => {
      "use strict";
      module.exports = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;
    },
    "storybook/internal/core-events": module => {
      "use strict";
      module.exports = __STORYBOOK_MODULE_CORE_EVENTS__;
    },
    "@storybook/global": module => {
      "use strict";
      module.exports = __STORYBOOK_MODULE_GLOBAL__;
    },
    "storybook/internal/preview-api": module => {
      "use strict";
      module.exports = __STORYBOOK_MODULE_PREVIEW_API__;
    },
  },
  __webpack_require__ => {
    __webpack_require__.O(0, [290], () => {
      return (
        (moduleId = "./storybook-config-entry.js"),
        __webpack_require__((__webpack_require__.s = moduleId))
      );
      var moduleId;
    });
    __webpack_require__.O();
  },
]);
