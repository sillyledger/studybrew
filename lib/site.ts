// Site-wide switches and app links.
// Flip SIGNUPS_OPEN to true the day sign-ups open: the home hero, the nav and
// the mobile menu all switch from "See the roadmap" to "Sign up free / Log in".

export const SIGNUPS_OPEN = true;

export const APP_WELCOME_URL = "https://app.studybrew.co/welcome";
export const APP_LOGIN_URL = "https://app.studybrew.co/login";

/** Sign-up buttons on the story pages: "Sign up free" once sign-ups open,
    otherwise "Sign-ups open soon" → /roadmap (and no "Log in"). */
export const SIGNUP = SIGNUPS_OPEN
  ? { open: true, label: "Sign up free", href: APP_WELCOME_URL, loginHref: APP_LOGIN_URL as string | null }
  : { open: false, label: "Sign-ups open soon", href: "/roadmap", loginHref: null as string | null };

/** Beta invite code, shown on /beta. Redeemed in the app under Settings → Plan. */
export const BETA_CODE = "STUDYBREW168";
