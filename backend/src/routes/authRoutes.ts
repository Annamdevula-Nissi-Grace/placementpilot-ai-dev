import { Router } from 'express';

import {
  createAuthenticatedSupabaseClient,
  supabase,
} from '../config/supabase.js';

import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();


/*
|--------------------------------------------------------------------------
| SIGN UP
|--------------------------------------------------------------------------
*/

router.post('/signup', async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
    } = req.body;

    if (
      typeof fullName !== 'string' ||
      !fullName.trim()
    ) {
      res.status(400).json({
        success: false,
        message: 'Full name is required.',
      });

      return;
    }

    if (
      typeof email !== 'string' ||
      !email.trim()
    ) {
      res.status(400).json({
        success: false,
        message: 'Email is required.',
      });

      return;
    }

    if (
      typeof password !== 'string' ||
      password.length < 8
    ) {
      res.status(400).json({
        success: false,
        message:
          'Password must contain at least 8 characters.',
      });

      return;
    }

    const {
      data,
      error,
    } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    if (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });

      return;
    }

    res.status(201).json({
      success: true,
      message: data.session
        ? 'Account created and signed in successfully.'
        : 'Account created. Please verify your email before signing in.',
      data: {
        user: data.user
          ? {
              id: data.user.id,
              email: data.user.email,
            }
          : null,

        session: data.session
          ? {
              accessToken:
                data.session.access_token,
              refreshToken:
                data.session.refresh_token,
              expiresAt:
                data.session.expires_at,
            }
          : null,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Signup failed.',
    });
  }
});


/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

router.post('/login', async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (
      typeof email !== 'string' ||
      !email.trim()
    ) {
      res.status(400).json({
        success: false,
        message: 'Email is required.',
      });

      return;
    }

    if (
      typeof password !== 'string' ||
      !password
    ) {
      res.status(400).json({
        success: false,
        message: 'Password is required.',
      });

      return;
    }

    const {
      data,
      error,
    } =
      await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

    if (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });

      return;
    }

    res.json({
      success: true,
      message: 'Login successful.',
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
        },

        session: {
          accessToken:
            data.session.access_token,
          refreshToken:
            data.session.refresh_token,
          expiresAt:
            data.session.expires_at,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Login failed.',
    });
  }
});


/*
|--------------------------------------------------------------------------
| CURRENT AUTHENTICATED USER
|--------------------------------------------------------------------------
*/

router.get(
  '/me',
  requireAuth,
  async (_req, res) => {
    try {
      const user = res.locals.user;
      const accessToken =
        res.locals.accessToken as string;

      const userSupabase =
        createAuthenticatedSupabaseClient(
          accessToken
        );

      const {
        data: profile,
        error,
      } = await userSupabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });

        return;
      }

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
          },
          profile,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Unable to load user.',
      });
    }
  }
);


export default router;