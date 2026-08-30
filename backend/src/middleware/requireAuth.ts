import type { NextFunction, Request, Response } from 'express';

import { supabase } from '../config/supabase.js';

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      message: 'Authentication token is required.',
    });
    return;
  }

  const accessToken = authorization.slice(7).trim();

  if (!accessToken) {
    res.status(401).json({
      success: false,
      message: 'Authentication token is required.',
    });
    return;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.',
    });
    return;
  }

  res.locals.user = user;
  res.locals.accessToken = accessToken;

  next();
}