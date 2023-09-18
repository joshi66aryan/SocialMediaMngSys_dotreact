using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace SocialNetworkApp.Model
{
    public class Post
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [StringLength(100)]
        public string? Title { get; set; }

        [StringLength(100)]
        public string? Content { get; set; }

        [StringLength(100)]
        public string? Email { get; set; }

        public int IsActive { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
