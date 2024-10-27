// src/socket/socketEvents.ts

// Editor-related events
export const EDITOR_JOIN_PROJECT = "editor:join-project";
export const EDITOR_LIVE_USER_JOINED = "editor:live-user-joined";

// File Explorer events
export const FILE_EXPLORER_INSERT_NODE = "file-explorer:insert-node";
export const FILE_EXPLORER_DELETE_NODE = "file-explorer:delete-node";

// Code Editor events
export const CODE_EDITOR_SEND_CHANGE = "code-editor:send-change";
export const CODE_EDITOR_RECEIVE_CHANGE = "code-editor:receive-change";
export const CODE_EDITOR_SEND_CURSOR = "code-editor:send-cursor";
export const CODE_EDITOR_RECEIVE_CURSOR = "code-editor:receive-cursor";
export const CODE_EDITOR_REMOVE_CURSOR = "code-editor:remove-cursor";

// User-related events
export const USER_JOIN_FILE = "code-editor:join-file";
export const USER_LEAVE_FILE = "code-editor:leave-file";
export const USER_LOAD_LIVE_USERS = "code-editor:load-live-users";
export const USER_REMOVE_ACTIVE_LIVE_USER = "code-editor:remove-active-live-user";
