using System;
using System.Collections.Generic;

namespace CrudContacto_React.Server.Models;

public partial class Contacto
{
    public int Idcontacto { get; set; }

    public string Nombre { get; set; } = null!;

    public string Correo { get; set; } = null!;

    public string Telefono { get; set; } = null!;
}
