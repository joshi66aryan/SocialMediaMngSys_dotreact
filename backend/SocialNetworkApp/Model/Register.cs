using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetworkApp.Model
{
	public class Register
	{
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [StringLength(100)]
        public string? Name { get; set; }

        [StringLength(100)]
        public string? Email { get; set; }

        [StringLength(100)]
        public string? Password { get; set; }

        [StringLength(100)]
        public string? PhoneNo { get; set; }

        public int IsActive { get; set; }

        public int IsApproved { get; set; }

        [MaxLength(50)]
        public string? Type { get; set; }
    }
}

