import Header from '../../components/Header/Header';
import './Profile.css';

function Profile() {
  const usuario = {
    nombre: 'Olivia Silva',
    email: 'olivia.silva@miecommerce.com',
    rol: 'Administrador',
    miembroDesde: 'Enero 2024',
    iniciales: 'OS',
  };

  return (
    <div className="profile">
      <Header
        title="Mi Perfil"
        actions={
          <button className="btn btn--secondary">Editar Perfil</button>
        }
      />

      <div className="profile__content">
        {/* Avatar y nombre */}
        <div className="profile__top">
          <div className="profile__avatar">
            <span>{usuario.iniciales}</span>
          </div>
          <div className="profile__info">
            <h2 className="profile__nombre">{usuario.nombre}</h2>
            <p className="profile__email">{usuario.email}</p>
          </div>
        </div>

        {/* Detalles */}
        <div className="profile__detalles">
          <div className="profile__seccion">
            <p className="profile__seccion-titulo">DETALLES BÁSICOS</p>
            <div className="profile__field">
              <label>Nombre Completo</label>
              <input value={usuario.nombre} readOnly />
            </div>
            <div className="profile__field">
              <label>Correo Electrónico</label>
              <input value={usuario.email} readOnly />
            </div>
          </div>

          <div className="profile__divider"></div>

          <div className="profile__seccion">
            <p className="profile__seccion-titulo">DATOS FIJOS</p>
            <div className="profile__field">
              <label>Rol</label>
              <input value={usuario.rol} readOnly />
            </div>
            <div className="profile__field">
              <label>Miembro Desde</label>
              <input value={usuario.miembroDesde} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;