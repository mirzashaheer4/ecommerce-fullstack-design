import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = 'My Profile | Brand eCommerce';
  }, []);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user]);

  const handleSave = async () => {
    if (!name.trim()) {
      showToast('Name cannot be empty', 'error');
      return;
    }
    setSaving(true);
    try {
      await updateUser({ name: name.trim() });
      setEditing(false);
      showToast('Profile updated successfully', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setEditing(false);
  };

  return (
    <div className="profile-page page-animate">
      <div className="container">
        <h2 className="page-title">My Profile</h2>
        <div className="profile-card">
          <div className="profile-avatar-lg">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>

          <div className="profile-details">
            <div className="profile-row">
              <div className="profile-label">
                <User size={16} /> Full Name
              </div>
              {editing ? (
                <div className="profile-edit-row">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="profile-input"
                    autoFocus
                  />
                  <button className="profile-save-btn" onClick={handleSave} disabled={saving}>
                    <Save size={14} /> {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button className="profile-cancel-btn" onClick={handleCancel}>
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="profile-value-row">
                  <span className="profile-value">{user?.name}</span>
                  <button className="profile-edit-btn" onClick={() => setEditing(true)}>
                    <Edit3 size={14} /> Edit
                  </button>
                </div>
              )}
            </div>

            <div className="profile-row">
              <div className="profile-label">
                <Mail size={16} /> Email
              </div>
              <span className="profile-value">{user?.email}</span>
            </div>

            <div className="profile-row">
              <div className="profile-label">
                <Shield size={16} /> Role
              </div>
              <span className="profile-badge">{user?.role || 'customer'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
