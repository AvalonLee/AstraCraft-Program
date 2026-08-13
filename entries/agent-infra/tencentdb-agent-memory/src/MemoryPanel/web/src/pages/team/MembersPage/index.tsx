import { useAuthStore } from '@/stores/auth';
import { useCurrentRole } from '@/services/useCurrentRole';
import TeamManagementPanel from '@/pages/team/components/TeamManagementPanel';

export function MembersPage() {
  const { auth } = useAuthStore();
  const role = useCurrentRole();
  if (!auth) return null;

  return (
    <TeamManagementPanel
      currentUser={auth.user_id}
      instanceId={auth.instance_id}
      isAdmin={role === 'admin'}
      section="members"
    />
  );
}
