from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Contacto, Especialidad
from .models import Estadoturno
from .models import Obra_Social
from .models import Profesional
from .models import Paciente
from .models import Turnos

# #0
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id',
                  'username',
                  'first_name',
                  'last_name',
                  'email',
                  'password']
# #1
class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model=Especialidad
        fields=['id', 'especialidad', 'descripcion', 'existe']
# #2
class EstadoturnoSerializer(serializers.ModelSerializer):
     class Meta:
         model = Estadoturno
         fields='__all__'
# #3
class ObraSocialSerializer(serializers.ModelSerializer):
    class Meta:
        model= Obra_Social
        fields='__all__'#Para que tome todos los campos
    
class ProfesionalSerializer(serializers.ModelSerializer):
    class Meta:
        model= Profesional
        fields=['id', 'nombre', 'apellido', 'especialidad']       
#5
class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Paciente
        fields='__all__'#Para que tome todos los campos  
# #6
class TurnosSerializer(serializers.ModelSerializer):
    nombre_profesional = serializers.SerializerMethodField()
    nombre_especialidad = serializers.CharField(source='especialidad.especialidad', read_only=True)

    class Meta:
        model = Turnos
        fields = [
            'id',
            'id_user_id',
            'paciente',
            'profesional',  # ID del profesional
            'nombre_profesional',  # Nombre completo
            'especialidad',  # ID de especialidad
            'nombre_especialidad',  # Nombre de especialidad
            'hora_turno',
            'fecha_turno'
        ]

    def get_nombre_profesional(self, obj):
        return f"{obj.profesional.nombre} {obj.profesional.apellido}"

#7
class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto      
        fields = '__all__'  